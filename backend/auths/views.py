from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.request import Request
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import random


class UserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class GetUserData(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    # user_permission =
    def get_object(self):
        # Return the currently authenticated user
        return self.request.user


class RoleViewSet(ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class CustomLoginView(APIView):
    def post(self, request: Request):
        phone = request.data.get("phone")
        if not phone:
            return Response(
                {"error": "Phone number is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = User.objects.filter(user_phone=phone).first()
        otp_code = random.randint(100000, 999999)
        if user:
            otp = OTP.objects.create(user=user, otp_code=otp_code)
            if otp:
                return Response(
                    {"success": True, "otp": otp.otp_code},
                    status=status.HTTP_201_CREATED,
                )
        else:
            new_user = User.objects.create(user_phone=phone)
            otp = OTP.objects.create(user=new_user, otp_code=otp_code)
            return Response(
                {"success": True, "otp": otp_code},
                status=status.HTTP_201_CREATED,
            )


class OTPView(APIView):
    def post(self, request: Request):
        phone = request.data.get("phone")
        otp_code = request.data.get("otp")
        if not phone or not otp_code:
            return Response(
                {"error": "Phone number and OTP code are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = User.objects.filter(user_phone=phone).first()
        if not user:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        otp = OTP.objects.filter(user=user, otp_code=otp_code).first()
        if not otp:
            return Response(
                {"error": "Invalid OTP code"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            if otp:
                otp.delete()
                user.is_active = True
                user.save()
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "success": True,
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                    status=status.HTTP_200_OK,
                )
