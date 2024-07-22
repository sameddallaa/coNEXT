from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Request, User


@receiver(post_save, sender=Request)
def create_user_requests(sender, instance, created, **kwargs):
    sender_ = instance.sender
    receiver = instance.receiver
    if instance.status == "pending" or instance.status == "non-friends":
        if sender_ in receiver.friends.all() or receiver in sender_.friends.all():
            sender_.friends.remove(receiver)
            receiver.friends.remove(sender_)
            instance.save()

    elif instance.status == "friends":
        if sender_ not in receiver.friends.all() or receiver not in sender_.friends.all():
            sender_.friends.add(receiver)
            receiver.friends.add(sender_)
            instance.save()
