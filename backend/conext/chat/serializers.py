from rest_framework import serializers
from .models import Chat, Message
from profiles.serializers import UserSerializer


class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    def get_participants(self, obj):
        return UserSerializer(obj.participants.all(), many=True).data

    def get_last_message(self, obj):
        last_message = obj.messages.all().order_by("sent_at").first()
        return MessageSerializer(last_message).data

    class Meta:
        model = Chat
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Message
        fields = "__all__"


class NewMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class ChatDetailSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    participants = UserSerializer(many=True)

    def get_messages(self, obj):
        return MessageSerializer(
            obj.messages.all().order_by("-sent_at"), many=True
        ).data

    class Meta:
        model = Chat
        fields = ["id", "participants", "messages"]
