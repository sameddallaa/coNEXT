from django.db import models
from profiles.models import User

# Create your models here.


PRIVACY_CHOICES = (
    ("public", "public"),
    ("friends", "friends"),
    ("me", "me"),
)


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, blank=True, related_name="liked_posts")
    attachment = models.FileField(upload_to="post_attachments/", null=True, blank=True)
    privacy = models.CharField(
        max_length=255, choices=PRIVACY_CHOICES, default="friends"
    )

    def __str__(self):
        return f"Post by {self.owner}"


class Comment(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, blank=True, related_name="liked_comments")
    image = models.ImageField(upload_to="comment_images/", null=True, blank=True)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="post_comments"
    )

    def __str__(self):
        return f"Comment by {self.owner}"
