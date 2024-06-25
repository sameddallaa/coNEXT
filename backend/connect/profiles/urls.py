from django.urls import path
from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path("signup", view=views.SignupView.as_view(), name="SignupView"),
    path("/all", view=views.UserRetrieveView.as_view(), name="UserRetrieveView"),
]
