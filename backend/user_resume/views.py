from rest_framework.viewsets import ModelViewSet
from .models import  UserResume, VideoResume, UserLanguage, UserSkill, UserDegree, UserSocialMediaLinks
from .serializers import (
    UserResumeSerializer,
    VideoResumeSerializer,
    UserLanguageSerializer,
    UserSkillSerializer,
    UserDegreeSerializer,
    UserSocialMediaLinksSerializer
)


class UserResumeViewSet(ModelViewSet):
    queryset = UserResume.objects.all()
    serializer_class = UserResumeSerializer

class VideoResumeViewSet(ModelViewSet):
    queryset = VideoResume.objects.all()
    serializer_class = VideoResumeSerializer

class UserLanguageViewSet(ModelViewSet):
    queryset = UserLanguage.objects.all()
    serializer_class = UserLanguageSerializer

class UserSkillViewSet(ModelViewSet):
    queryset = UserSkill.objects.all()
    serializer_class = UserSkillSerializer

class UserDegreeViewSet(ModelViewSet):
    queryset = UserDegree.objects.all()
    serializer_class = UserDegreeSerializer

class UserSocialMediaLinksViewSet(ModelViewSet):
    queryset = UserSocialMediaLinks.objects.all()
    serializer_class = UserSocialMediaLinksSerializer
