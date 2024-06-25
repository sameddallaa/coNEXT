from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from datetime import date
from django.contrib.auth.password_validation import validate_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["email"] = user.email
        token["username"] = user.username
        token["name"] = user.full_name

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "birthdate",
            "profile_image",
            "friends",
        )


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
