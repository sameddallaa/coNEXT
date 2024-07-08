from django.db import models
from profiles.models import User
from posts.models import Post
from django.core.exceptions import ValidationError

# Create your models here.


class Chat(models.Model):
    participants = models.ManyToManyField(User, related_name="chats")
    def __str__(self):
        return f"Chat between {", ".join([str(participant) for participant in self.participants.all()])}"

STATUS = (
    ('sent', 'sent'),
    ('delivered', 'delivered'),
    ('read', 'read')
)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="received_messages"
    )
    body = models.TextField(blank=True, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    attachment = models.FileField(
        upload_to="message_attachments/", null=True, blank=True
    )
    status = models.CharField(max_length=255, choices=STATUS, default="sent")
    sent_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.body and not self.post and not self.attachment:
            raise ValidationError(
                "Message must have either a body, a post, or an attachment"
            )
        if (
            self.sender not in self.chat.participants.all()
            or self.receiver not in self.chat.participants.all()
        ):
            raise ValidationError(
                "Sender and receiver must be participants in the chat"
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver}"
