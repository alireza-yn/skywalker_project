from rest_framework.routers import DefaultRouter
from django.urls import path,include
from management.views import * 
from tasks.views import *
from programming_language.views import *
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from user_resume.views import *
from projects.views import *
router = DefaultRouter()
router.register('project',viewset=ProjectViewSet)
router.register('team_project',viewset=ProjectTeamViewSet)
router.register('tasks',viewset=TaskViewSet)

#region UserResume Router
router.register(r'user-resumes', UserResumeViewSet)
router.register(r'video-resumes', VideoResumeViewSet)
router.register(r'user-languages', UserLanguageViewSet)
router.register(r'user-skills', UserSkillViewSet)
router.register(r'user-degrees', UserDegreeViewSet)
router.register(r'user-social-media-links', UserSocialMediaLinksViewSet)
router.register(r'user-expertise', UserExpertiseViewSet)
router.register(r'add_resume', AddUserResume, basename='add_resume')

#endregion



#region ProgrammingLanguage Router
router.register(r'programming-languages', ProgrammingLanguageViewSet)
router.register(r'programmer-skills', ProgrammerSkillViewSet)
router.register(r'programmer-exprertise', ProgrammerExpertiseViewSet)
#endregion



#region project router
router.register(r'create_project', ProjectViewSet,basename="project_created")
router.register(r'new_project', CreateProjectAPIView,basename="new_project")

#endregion


urlpatterns = [
    path('v1/',include(router.urls)),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc')
    
]