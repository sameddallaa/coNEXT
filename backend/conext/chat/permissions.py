from rest_framework import permissions


class IsParticipant(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (request.user in obj.participants.all()) or request.user.is_staff


class IsSenderOrReceiver(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            request.user == obj.sender
            or request.user == obj.receiver
            or request.user.is_staff
        )
