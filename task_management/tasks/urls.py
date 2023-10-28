from django.urls import path
from tasks.views import TasksAPI,TaskCreateAPI,TaskUpdateAPI,TaskDeleteAPI,TaskIdAPI

urlpatterns = [
    path('',TasksAPI.as_view(), name="tasks_list_view"),
    path('get/<int:task_id>/', TaskIdAPI.as_view(), name="get_task_page"),
    path('create/',TaskCreateAPI.as_view(), name="task_create_page"),
    path('update/<int:task_id>/', TaskUpdateAPI.as_view(), name="task_update_page" ),
    path('delete/<int:task_id>/',TaskDeleteAPI.as_view(), name='task_delete_page')
]