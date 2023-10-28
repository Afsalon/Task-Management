from django.urls import path
from comment.views import CommentAPI,CommentPostAPI

urlpatterns = [
    path('comment/<int:task_id>/',CommentAPI.as_view(), name="comments_page"),
    path('comment/post/<int:task_id>/', CommentPostAPI.as_view(), name='comment_post')
]