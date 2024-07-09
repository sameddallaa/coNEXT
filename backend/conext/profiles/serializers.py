from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from datetime import date
from django.contrib.auth.password_validation import validate_password
from posts.serializers import PostSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["email"] = user.email
        token["username"] = user.username
        token["name"] = user.full_name

        return token


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return obj.full_name

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "full_name",
            "first_name",
            "last_name",
            "bio",
            "birthdate",
            "profile_image",
            "friends",
            "is_staff",
        )


class BriefUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "full_name", "profile_image")


class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255, required=False)
    birthdate = serializers.DateField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "birthdate",
            "password",
            "password2",
        ]

    def validate(self, attrs):
        if User.objects.filter(email=attrs.get("email")).exists():
            raise ValidationError("Email already exists")
        if User.objects.filter(username=attrs.get("username")).exists():
            raise ValidationError("Username already exists")
        if not date.today().year - attrs.get("birthdate").year >= 13:
            raise ValidationError("You must be at least 13 years old")
        if attrs.get("password") != attrs.get("password2"):
            raise ValidationError(f"Passwords do not match.")

        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.get("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class UserFeedSerializer(serializers.ModelSerializer):
    top_friends = serializers.SerializerMethodField()
    posts = serializers.SerializerMethodField()

    def get_posts(self, obj):
        friends = obj.friends.all()
        request = self.context.get("request")
        posts = []
        for friend in friends:
            posts += [
                PostSerializer(post, context={"request": request}).data
                for post in friend.posts.all()
            ]
        return posts

    def get_top_friends(self, obj):
        return BriefUserSerializer(obj.friends.all()[:3], many=True).data

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "bio",
            "profile_image",
            "top_friends",
            "posts",
        ]


class UserChatsSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    chats = serializers.SerializerMethodField()

    def get_chats(self, obj):
        from chat.serializers import ChatSerializer

        return ChatSerializer(obj.chats.all(), many=True).data

    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image and request is not None:
            return request.build_absolute_uri(obj.profile_image.url)
        return None

    class Meta:
        model = User
        fields = ["id", "email", "username", "profile_image", "chats"]
