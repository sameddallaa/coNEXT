from rest_framework.generics import ListAPIView
from rest_framework.views import APIView, Response, status
from .models import Post
from profiles.serializers import BriefUserSerializer
from .serializers import PostSerializer, NewPostSerializer

# Create your views here.


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
