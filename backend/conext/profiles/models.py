from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from datetime import date
from .validators import validate_birthdate, validate_username
from django.core.exceptions import ValidationError

# Create your models here.


class UserManager(BaseUserManager):

    def create_user(
        self,
        email: str,
        username: str,
        first_name: str,
        birthdate: date,
        last_name: str = "",
        password=None,
        is_superuser=False,
        is_staff=False,
        is_active=True,
        **extra_fields,
    ):
        user = self.model(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            birthdate=birthdate,
            is_superuser=is_superuser,
            is_staff=is_staff,
            is_active=is_active,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self,
        email: str,
        username: str,
        first_name: str,
        birthdate: date,
        last_name: str = "",
        password=None,
        is_superuser=True,
        is_staff=True,
        is_active=True,
        **extra_fields,
    ):
        if not (is_staff and is_superuser):
            raise ValueError("Superuser must have is_staff=True and is_superuser=True")
        user = self.create_user(
            email,
            username,
            first_name,
            birthdate,
            last_name,
            password,
            is_superuser,
            is_staff,
            is_active,
            **extra_fields,
        )

        return user


class User(AbstractUser):

    email = models.EmailField("User email", unique=True)
    username = models.CharField(
        "Username", max_length=255, unique=True, validators=[validate_username]
    )
    bio = models.TextField(max_length=200, null=True, blank=True)
    first_name = models.CharField("First Name", max_length=127)
    last_name = models.CharField("Last Name", max_length=255, blank=True, null=True)
    birthdate = models.DateField("Date of birth", validators=[validate_birthdate])
    friends = models.ManyToManyField("self", blank=True)
    profile_image = models.ImageField(
        "Profile picture",
        upload_to="profiles_pics/",
        default="profile_pics/Default_pfp.svg.png",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "birthdate"]

    objects = UserManager()

    @property
    def full_name(self):
        if self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.first_name

    def __str__(self):
        return self.username


RELATIONSHIPS = (
    ("friends", "friends"),
    ("pending", "pending"),
)


class Request(models.Model):
    sender = models.ForeignKey(
        User, related_name="sent_requests", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User, related_name="received_requests", on_delete=models.CASCADE
    )
    status = models.CharField(max_length=255, choices=RELATIONSHIPS, default="pending")

    def __str__(self):
        return f"{self.sender} to {self.receiver} - {self.status}"

    def save(self, *args, **kwargs):
        if (
            Request.objects.filter(
                sender=self.sender,
                receiver=self.receiver,
            )
            .exclude(pk=self.pk)
            .exists()
            or Request.objects.filter(
                sender=self.receiver,
                receiver=self.sender,
            )
            .exclude(pk=self.pk)
            .exists()
        ):
            raise ValidationError("Request already exists")

        super().save(*args, **kwargs)
