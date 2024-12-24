from django.db import models
from django.conf import settings
# Create your models here.
from programming_language.models import *

class UserResume(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="user_resume")
    title = models.CharField(max_length=100)
    description = models.TextField()
    cv_file = models.FileField(upload_to='static/resume/cv_resume',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user} - {self.title}"
    
    
class VideoResume(models.Model):
    user = models.ForeignKey(UserResume, on_delete=models.CASCADE,related_name="video_resume")
    video_file = models.FileField(upload_to='static/resume/video_resume',null=True,blank=True)
    title = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to='static/resume/video_resume',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class UserDegree(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="user_degree")
    degree_file = models.FileField(upload_to='static/resume/degree_resume',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserLanguage(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="user_language")
    language_name = models.ForeignKey(ProgrammingLanguage, on_delete=models.CASCADE,related_name="language_name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('user', 'language_name')
        
    def __str__(self):
        return f"{self.language_name.name} - {self.language_name.level}"

class UserSkill(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="user_skill")
    skill_name = models.ForeignKey(ProgrammerSkill, on_delete=models.CASCADE,related_name="language_name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('user', 'skill_name')
    def __str__(self):
        return f"{self.user} - {self.skill_name}"

class UserSocialMediaLinks(models.Model):
    SOCIAL_NAME = [
        ("instagram","instagram"),
        ("linkedin","linkedin"),
        ("github","github"),
        ("facebook","facebook")
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="user_social_media_links")
    social_media_name = models.CharField(max_length=100,choices=SOCIAL_NAME,blank=True,null=True)
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user} - {self.social_media_name}"