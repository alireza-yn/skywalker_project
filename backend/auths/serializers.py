from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import *
from user_resume.serializers import *
from django.contrib.auth import get_user_model
from programming_language.serializers import *
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()




class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class UserSerializer(ModelSerializer):
    user_roles = StringRelatedField(many=True, read_only=True)
    user_resume = UserResumeSerializer()
    user_language = StringRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "is_superuser",
            "username",
            "password",
            "user_phone",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "unlimited",
            "created",
            "updated",
            "uuid",
            "user_roles",
            "user_resume",
            "user_language",
        ]
        # extra_kwargs = {'user_roles': {'read_only': True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
