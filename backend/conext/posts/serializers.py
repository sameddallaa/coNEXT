from rest_framework import serializers
from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    owner_name = serializers.CharField(source="owner.full_name", read_only=True)
    comment_count = serializers.SerializerMethodField()
    attachment = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    profile_image = serializers.FileField(source="owner.profile_image")

    def get_owner(self, obj):
        from profiles.serializers import UserSerializer

        return UserSerializer(obj.owner, context=self.context).data

    def get_comments(self, obj):
        return CommentSerializer(obj.post_comments.all(), many=True).data

    def get_comment_count(self, obj):
        return obj.post_comments.all().count()

    def get_attachment(self, obj):
        request = self.context.get("request")
        if obj.attachment and request is not None:
            return request.build_absolute_uri(obj.attachment.url)
        return None

    def get_like_count(self, obj):
        return obj.likes.all().count()

    class Meta:
        model = Post
        fields = [
            "id",
            "owner",
            "owner_name",
            "content",
            "posted_at",
            "attachment",
            "likes",
            "like_count",
            "comments",
            "comment_count",
            "profile_image",
        ]


class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["owner", "content", "attachment", "privacy"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
