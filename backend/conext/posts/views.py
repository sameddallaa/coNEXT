from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.views import APIView, Response, status
from .models import Post
from profiles.serializers import BriefUserSerializer
from .serializers import PostSerializer, NewPostSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication


class PostsListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreateView(APIView):
    queryset = Post.objects.all()
    serializer_class = NewPostSerializer

    def get(self, request, *args, **kwargs):
        if request.user:
            return Response({"user": BriefUserSerializer(request.user).data})

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LikePostView(APIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        post = get_object_or_404(Post, pk=pk)
        if post.likes.filter(id=request.user.id).exists():
            return Response({"message": "liked"}, status=status.HTTP_200_OK)
        return Response({"message": "unliked"}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        post = get_object_or_404(Post, pk=pk)
        if post.likes.filter(id=request.user.id).exists():
            post.likes.remove(request.user)
            return Response({"message": "liked"}, status=status.HTTP_200_OK)
        post.likes.add(request.user)
        return Response({"message": "unliked"}, status=status.HTTP_200_OK)
