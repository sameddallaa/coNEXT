from rest_framework import serializers
from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    def get_comments(self, obj):
        return obj.posts.all()

    def get_comment_count(self, obj):
        return obj.posts.all().count()

    class Meta:
        model = Post
        fields = [
            "id",
            "owner",
            "content",
            "posted_at",
            "attachment",
            "likes",
            "comments",
            "comment_count",
        ]
