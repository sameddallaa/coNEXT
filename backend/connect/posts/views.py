from django.shortcuts import render
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.views import APIView, Response, status
from .models import Post
from profiles.models import User
from .serializers import PostSerializer

# Create your views here.


class PostsListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
