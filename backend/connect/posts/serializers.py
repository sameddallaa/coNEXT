from rest_framework import serializers
from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    attachment = serializers.SerializerMethodField()

    def get_comments(self, obj):
        return CommentSerializer(obj.post_comments.all(), many=True).data

    def get_comment_count(self, obj):
        return obj.post_comments.all().count()

    def get_attachment(self, obj):
        request = self.context.get("request")
        if obj.attachment and request is not None:
            return request.build_absolute_uri(obj.attachment.url)
        return None

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


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
