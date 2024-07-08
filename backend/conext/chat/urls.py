from django.urls import path
from . import views

urlpatterns = [
    path("all", view=views.ChatsListView.as_view(), name="ChatsListView"),
    path(
        "messages/all", view=views.MessagesListView.as_view(), name="MessagesListView"
    ),
    path(
        "<int:pk>/messages", view=views.ChatDetailView.as_view(), name="ChatDetailView"
    ),
]
