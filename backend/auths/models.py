from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings
from django.core.validators import RegexValidator
from datetime import datetime
import os
import uuid

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The email number must be set')
        email = self.normalize_email(email)  # Ensure email normalization
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)  # Hash the password
        else:
            raise ValueError('Password must be set for creating a user.')  # Enforce password setting
        user.save(using=self._db)
        return user


    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


    def update_user(self, user, password=None, **extra_fields):
        for key, value in extra_fields.items():
            setattr(user, key, value)

        if password:  # اگر رمز عبور تغییر کرده باشد
            user.set_password(password)  # هش کردن رمز عبور

        user.save(using=self._db)
        return user
    


class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_validator = RegexValidator(regex=r'^09\d{9}$', message="Phone number must be 11 digits.")
    username = models.CharField(unique=True, null=True, blank=True, max_length=50)
    email = models.EmailField(unique=True, blank=False)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    user_phone = models.CharField(max_length=11, unique=True, validators=[phone_validator])
    is_active = models.BooleanField(default=False, verbose_name="کاربر فعال")
    is_staff = models.BooleanField(default=False, verbose_name="عضو کارکنان")
    unlimited = models.BooleanField(default=False, verbose_name="بدون محدودیت")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, verbose_name="شناسه یکتا")
    def user_directory_path(instance, filename):
        extension = filename.split('.')[-1]
        new_filename = f"profile_{instance.email}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{extension}"
        return f'static/users/{instance.email}/{new_filename}'

    image_profile = models.ImageField(upload_to=user_directory_path, blank=True)
    
    def save(self, *args, **kwargs):
        if self.pk is None or not CustomUser.objects.filter(pk=self.pk).exists():
            # اگر کاربر جدید است
            if self.password and not self.password.startswith('pbkdf2_'): 
                self.set_password(self.password)
        elif self.password != CustomUser.objects.get(pk=self.pk).password:
            # اگر رمز عبور تغییر کرده است
            self.set_password(self.password)
        super().save(*args, **kwargs)
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True
    )

    objects = CustomUserManager()

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.username if self.username else self.email


class OTP(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "One-Time Password"
        verbose_name_plural = "One-Time Passwords"
