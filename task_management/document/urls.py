from django.urls import path
from document.views import DocumentAPI,DocumentPostAPI

urlpatterns = [
    path('document/<int:task_id>/',DocumentAPI.as_view(), name="documents_page"),
    path('document/post/<int:task_id>/', DocumentPostAPI.as_view(), name='documents_post_page')
]