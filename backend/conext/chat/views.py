from django.shortcuts import render
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer, ChatDetailSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView, Response, status
from .permissions import IsParticipant

# Create your views here.


class ChatsListView(ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [
        SessionAuthentication,
        JWTAuthentication,
    ]


class MessagesListView(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [
        SessionAuthentication,
        JWTAuthentication,
    ]


class ChatDetailView(APIView):
    queryset = Chat.objects.all()
    permission_classes = [IsParticipant]
    authentication_classes = [
        SessionAuthentication,
        JWTAuthentication,
    ]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk:
            chat = Chat.objects.filter(pk=pk).first()
            if chat:
                self.check_object_permissions(request, chat)
                serializer = ChatDetailSerializer(chat)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(
                {"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"error": "Chat id not provided"}, status=status.HTTP_400_BAD_REQUEST
        )
