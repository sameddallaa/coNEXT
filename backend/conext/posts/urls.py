from django.urls import path
from . import views

urlpatterns = [
    path("all", view=views.PostsListView.as_view(), name="PostsListView"),
    path("new", view=views.PostCreateView.as_view(), name="PostCreateView"),
    path("<int:pk>/like", view=views.LikePostView.as_view(), name="LikePostView"),
]
