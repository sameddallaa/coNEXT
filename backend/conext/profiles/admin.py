from django.contrib import admin
from .models import User, Request
from django.contrib.auth.admin import UserAdmin as BaseAdmin

# Register your models here.


class UserAdmin(BaseAdmin):
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "birthdate",
        "is_staff",
        "is_superuser",
        "is_active",
    )

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Personal Info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "bio",
                    "email",
                    "birthdate",
                    "profile_image",
                    "friends",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "username",
                    "birthdate",
                    "profile_image",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_superuser",
                    "is_active",
                ),
            },
        ),
    )


admin.site.register(User, UserAdmin)
admin.site.register(Request)
