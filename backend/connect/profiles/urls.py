from django.urls import path
from . import views
from .views import MyTokenObtainPairView

urlpatterns = [path("", view=views.UserRetrieveView.as_view(), name="UserRetrieveView")]
