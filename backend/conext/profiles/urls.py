from django.urls import path
from . import views

urlpatterns = [
    path("signup", view=views.SignupView.as_view(), name="SignupView"),
    path("all", view=views.UserRetrieveView.as_view(), name="UserRetrieveView"),
    path("feed/<int:pk>", view=views.UserFeedView.as_view(), name="UserFeedView"),
    path("chats/<int:pk>", view=views.UserChatsView.as_view(), name="UserChatsView"),
]
