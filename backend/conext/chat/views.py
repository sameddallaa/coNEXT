from django.shortcuts import render
from .models import Chat, Message
from django.db.models import Count
from .serializers import (
    ChatSerializer,
    MessageSerializer,
    ChatDetailSerializer,
    NewMessageSerializer,
)
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView, Response, status
from rest_framework.pagination import LimitOffsetPagination
from .permissions import IsParticipant, IsSenderOrReceiver
from profiles.models import User
from django.core.exceptions import ValidationError

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


class ChatDetailView(GenericAPIView):
    queryset = Chat.objects.all()
    permission_classes = [IsParticipant]
    authentication_classes = [
        SessionAuthentication,
        JWTAuthentication,
    ]
    serializer_class = ChatDetailSerializer

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

    # def post(self, request, *args, **kwargs):
    #     pk = kwargs.get("pk", None)
    #     if pk:
    #         chat = Chat.objects.filter(pk=pk).first()
    #         if chat:
    #             self.check_object_permissions(request, chat)
    #             data = request.data
    #             data["chat"] = chat.pk
    #             serializer = MessageSerializer(data=data)
    #             if serializer.is_valid():
    #                 serializer.save()
    #                 return Response(serializer.data, status=status.HTTP_201_CREATED)
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #         return Response(
    #             {"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND
    #         )
    #     return Response(
    #         {"error": "Chat id not provided"}, status=status.HTTP_400_BAD_REQUEST
    #     )


class NewMessageView(GenericAPIView):
    queryset = Message.objects.all()
    serializer_class = NewMessageSerializer
    permission_classes = [IsSenderOrReceiver]
    authentication_classes = [
        SessionAuthentication,
        JWTAuthentication,
    ]

    def post(self, request, *args, **kwargs):
        sender = request.user.pk
        receiver = kwargs.get("receiver")
        if not User.objects.filter(pk=receiver).exists():
            raise ValidationError("Receiver does not exist")
        chats_with_sender = Chat.objects.filter(participants=sender)
        chat = (
            chats_with_sender.filter(participants=receiver)
            .annotate(num_participants=Count("participants"))
            .filter(num_participants=2)
            .first()
        )
        if not chat:
            chat = Chat.objects.create()
            chat.participants.add(sender, receiver)
        print(request.data)
        data = request.data.copy()
        data["chat"] = chat.pk
        data["sender"] = sender
        data["receiver"] = receiver
        print(data)
        serializer = NewMessageSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
