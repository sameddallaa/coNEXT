from django.shortcuts import render
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from rest_framework.generics import ListAPIView

# Create your views here.


class ChatsListView(ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class MessagesListView(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
