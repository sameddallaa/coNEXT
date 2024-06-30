from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
)
from .models import User
from .serializers import (
    UserSerializer,
    MyTokenObtainPairSerializer,
    SignupSerializer,
    UserFeedSerializer,
)
from rest_framework.views import APIView, Response, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import GenericAPIView
from rest_framework import permissions

# Create your views here.


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


class UserFeedView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserFeedSerializer
