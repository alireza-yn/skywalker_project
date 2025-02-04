from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from rest_framework.generics import ListAPIView
from .service import ConsultHubService
from django.db.models import Q



class ConsultHubView(ModelViewSet):
    queryset = ConsultSession.objects.all()
    serializer_class = ConsultSerializer
    


class DebuggerHubView(ModelViewSet):
    queryset = DebugSession.objects.all().order_by('-created_at')
    serializer_class = DebuggerSerializer
    
    
    

class DebuggerApplicatorView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = DebuggerSerializer
    
    def get_queryset(self):
        return DebugSession.objects.filter(models.Q(debuger=self.request.user) | models.Q(debuger_applicator=self.request.user)).order_by('created_at')


class RequestDebugeFromUsers(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = DebuggerSerializer
    
    def get_queryset(self):
        return DebugSession.objects.filter(Q(debuger=self.request.user) | Q(debuger_applicator=self.request.user)).order_by('created_at')



class UserOpendDebugList(ListAPIView,ConsultHubService):
    serializer_class = DebuggerSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return self.getOpenedSession(self.request.user)