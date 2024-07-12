import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import *
from profiles.models import User


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
        self.chat_group_name = f"chat_{self.chat_id}"
        await self.channel_layer.group_add(self.chat_id, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.chat_id, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        body = text_data_json.get("body", "")
        sender = text_data_json["sender"]
        receiver = text_data_json.get("receiver")
        attachment = text_data_json.get("attachment", None)
        post = text_data_json.get("post", None)

        sender = await User.objects.filter(pk=sender).first()
        receiver = await User.objects.filter(pk=receiver).first()
        chat = await Chat.objects.filter(pk=self.chat_id).first()
        post = await Post.objects.filter(pk=post).first()

        new_message = await Message.objects.create(
            chat=chat,
            sender=sender,
            receiver=receiver,
            attachment=attachment,
            post=post,
        )

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                "type": "chat_message",
                "body": body,
                "sender": sender,
                "receiver": receiver,
                "attachment": attachment,
                "post": post,
            },
        )

        async def chat_message(self, event):
            body = event["body"]
            sender = event["sender"]
            receiver = event["receiver"]
            attachment = event["attachment"]
            post = event["post"]

            await self.send(
                text_data=json.dumps(
                    {
                        "body": body,
                        "sender": sender,
                        "receiver": receiver,
                        "attachment": attachment,
                        "post": post,
                    }
                )
            )
