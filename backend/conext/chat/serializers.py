from rest_framework import serializers
from .models import Chat, Message
from profiles.serializers import UserSerializer


class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()

    def get_participants(self, obj):
        return UserSerializer(obj.participants.all(), many=True).data

    class Meta:
        model = Chat
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Message
        fields = "__all__"
