from django.shortcuts import render
from .models import Chat, Message
from django.db.models import Count, Q
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
from rest_framework.views import Response, status
from .permissions import IsParticipant, IsSenderOrReceiver
from profiles.models import User
from django.core.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination

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
    # permission_classes = [IsParticipant]
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
                paginator = PageNumberPagination()
                paginator.page_size = 50
                paginated_messages = paginator.paginate_queryset(
                    chat.messages.all().order_by("-sent_at"), request
                )
                serializer = MessageSerializer(
                    paginated_messages, context={"request": request}, many=True
                )
                return paginator.get_paginated_response(serializer.data)
            return Response(
                {"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"error": "Chat id not provided"}, status=status.HTTP_400_BAD_REQUEST
        )


class ChatParticipantsView(GenericAPIView):
    queryset = Chat.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        chat = Chat.objects.filter(pk=pk).first()
        if not chat:
            raise ValueError(f"Chat with pk: {pk} does not exist. ")
        from profiles.serializers import UserSerializer

        serializer = UserSerializer(chat.participants.all(), many=True).data
        return Response(serializer, status=status.HTTP_200_OK)


class NewMessageView(GenericAPIView):
    queryset = Message.objects.all()
    serializer_class = NewMessageSerializer
    permission_classes = [IsSenderOrReceiver]
    authentication_classes = [
        SessionAuthentication,
        JWTAuthentication,
    ]

    def get(self, request, *args, **kwargs):
        receiver = kwargs.get("receiver")
        if not User.objects.filter(pk=receiver).exists():
            raise ValidationError("Receiver does not exist")
        receiver = User.objects.get(pk=receiver)
        return Response(
            {"data": f"send message to {receiver}"}, status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        sender = request.user
        receiver = kwargs.get("receiver")
        if not User.objects.filter(pk=receiver).exists():
            raise ValidationError("Receiver does not exist")
        receiver = User.objects.get(pk=receiver)
        chat = (
            Chat.objects.filter(participants=sender)
            .filter(participants=receiver)
            .first()
        )

        print(f"chat is {chat}")
        if not chat:
            chat = Chat.objects.create()
            chat.participants.add(sender, receiver)
        print(request.data)
        data = request.data.copy()
        data["chat"] = chat.pk
        data["sender"] = sender.pk
        data["receiver"] = receiver.pk
        print(data)
        serializer = NewMessageSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"success": "message has been sent"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
