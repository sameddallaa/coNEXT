from django.urls import path
from . import views

urlpatterns = [path("all", view=views.PostsListView.as_view(), name="PostsListView")]
