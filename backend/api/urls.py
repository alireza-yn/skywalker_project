from rest_framework.routers import DefaultRouter
from django.urls import path,include
from management.views import * 
from tasks.views import *
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

router = DefaultRouter()
router.register('project',viewset=ProjectViewSet)
router.register('team_project',viewset=ProjectTeamViewSet)
router.register('tasks',viewset=TaskViewSet)


urlpatterns = [
    path('v1/',include(router.urls)),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]