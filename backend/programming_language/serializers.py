from rest_framework.serializers import ModelSerializer

from .models import *


class ProgrammingLanguageSerializer(ModelSerializer):
    class Meta:
        model = ProgrammingLanguage
        fields = '__all__'

class ProgrammerSkillSerializer(ModelSerializer):
    class Meta:
        model = ProgrammerSkill
        fields = '__all__'