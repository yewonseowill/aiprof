
# main/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # 루트 경로에서 home() 실행
    path('upload/', views.image_upload, name='image_upload'),
    path('ocr/', views.ocr, name='ocr'),
    path('vlm/', views.vlm, name='vlm'),
    path('sum/', views.sum, name='sum'),
    path('quiz/', views.quiz, name='quiz'),
]