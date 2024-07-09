from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import User
from .serializers import (
    UserSerializer,
    MyTokenObtainPairSerializer,
    SignupSerializer,
    UserFeedSerializer,
    UserChatsSerializer,
)
from .permissions import IsOwnerOrAdmin
from rest_framework.views import APIView, Response, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework import permissions, authentication


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email") or None
        if not User.objects.filter(email=email).exists():
            return Response(
                {"detail": "User with this email does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        return super(MyTokenObtainPairView, self).post(request, *args, **kwargs)


class UserRetrieveView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SignupView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserFeedView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserFeedSerializer

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    authentication_classes = [JWTAuthentication, authentication.SessionAuthentication]
    permission_classes = [IsOwnerOrAdmin]


class UserChatsView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserChatsSerializer

    def get(self, request, *args, **kwargs):
        user = kwargs.get("pk")
        if not User.objects.filter(pk=user).exists():
            raise ValueError("User does not exist")
        user = User.objects.get(pk=user)
        serializer = UserChatsSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
