from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from .serializers import *


class UserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    # permission_classes = [IsAdminUser]
    serializer_class = UserSerializer



class GetUserData(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the currently authenticated user
        return self.request.user

