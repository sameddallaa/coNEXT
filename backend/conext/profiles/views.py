from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import User, Request
from .serializers import (
    UserSerializer,
    MyTokenObtainPairSerializer,
    SignupSerializer,
    UserFeedSerializer,
    UserChatsSerializer,
    PublicProfileSerializer,
    UserProfileImageSerializer,
    RequestSerializer,
)
from .permissions import IsOwnerOrAdmin
from rest_framework.views import APIView, Response, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import GenericAPIView, UpdateAPIView
from rest_framework import permissions, authentication
from posts.models import Post
from posts.serializers import PostSerializer
from rest_framework.authentication import SessionAuthentication


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


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveView(RetrieveAPIView):
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
        serializer = UserChatsSerializer(user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserPostsView(GenericAPIView):

    queryset = User.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        user = kwargs.get("pk")
        try:
            user = User.objects.get(pk=user)
            posts = Post.objects.filter(owner=user)
            serializer = PostSerializer(posts, context={"request": request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {"detail": "User with this id does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )


class UserProfileImageView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileImageSerializer

    def get(self, request, *args, **kwargs):
        user = kwargs.get("pk")
        try:
            user = User.objects.get(pk=user)
            profile_image = self.serializer_class(
                user, context={"request": request}
            ).data
            return Response(profile_image, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {"error": "user with provided id does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )


class EditProfileView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = PublicProfileSerializer


class RequestCreateView(GenericAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def get(self, request, *args, **kwargs):
        user1 = request.user
        user2 = User.objects.filter(pk=kwargs.get("pk")).first()
        if Request.objects.filter(sender=user1, receiver=user2).exists():
            request_ins = Request.objects.filter(sender=user1, receiver=user2).first()
            serializer = self.serializer_class(request_ins)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if Request.objects.filter(receiver=user1, sender=user2).exists():
            request_ins = Request.objects.filter(receiver=user1, sender=user2).first()
            serializer = self.serializer_class(request_ins)
            return Response(serializer.data, status=status.HTTP_200_OK)
        request_ins = Request.objects.create(sender=user1, receiver=user2)
        request_ins.save()
        serializer = self.serializer_class(request_ins)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user1 = request.user
        user2 = User.objects.filter(pk=kwargs.get("pk")).first()
        status_ = request.data.get("status", "pending")
        if Request.objects.filter(sender=user1, receiver=user2).exists():
            request_ins = Request.objects.filter(sender=user1, receiver=user2).first()
            request_ins.status = status_
            request_ins.save()
            return Response({"message": "done"}, status=status.HTTP_200_OK)
        if Request.objects.filter(receiver=user1, sender=user2).exists():
            request_ins = Request.objects.filter(receiver=user1, sender=user2).first()
            request_ins.status = status_
            request_ins.save()
            return Response({"message": "done"}, status=status.HTTP_200_OK)
        request_ins = Request.objects.create(
            sender=user1, receiver=user2, status=status_
        )
        request_ins.save()
        return Response({"message": "done"}, status=status.HTTP_200_OK)
