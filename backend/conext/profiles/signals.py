from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Request, User


@receiver(post_save, sender=Request)
def create_user_requests(sender, instance, created, **kwargs):
    user1 = instance.users.first()
    user2 = instance.users.last()
    if instance.status == "pending" or instance.status == "non-friends":
        if user1 in user2.friends.all() or user2 in user1.friends.all():
            user1.friends.remove(user2)
            user2.friends.remove(user1)
            instance.save()

    elif instance.status == "friends":
        if user1 not in user2.friends.all() or user2 not in user1.friends.all():
            user1.friends.add(user2)
            user2.friends.add(user1)
            instance.save()
