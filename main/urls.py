from django.urls import path
from . import views, admin


# main/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # 루트 경로에서 home() 실행
    path('upload/', views.image_upload, name='image_upload'),
]