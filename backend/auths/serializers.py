from rest_framework.serializers import ModelSerializer
from .models import *

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(ModelSerializer):
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
            "uuid"
        ]
        # extra_kwargs = {'created': {'read_only': True}}

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
