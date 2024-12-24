from rest_framework.serializers import ModelSerializer
from .models import *
class UserResumeSerializer(ModelSerializer):
    class Meta:
        model = UserResume
        fields = '__all__'
        
class VideoResumeSerializer(ModelSerializer):
    class Meta:
        model = VideoResume
        fields = '__all__'


class UserLanguageSerializer(ModelSerializer):
    class Meta:
        model = UserLanguage
        fields = '__all__'
    
    

class UserSkillSerializer(ModelSerializer):
    class Meta:
        model = UserSkill
        fields = '__all__'

class UserDegreeSerializer(ModelSerializer):
    class Meta:
        model = UserDegree
        fields = '__all__'

class UserSocialMediaLinksSerializer(ModelSerializer):
    class Meta:
        model = UserSocialMediaLinks
        fields = '__all__'