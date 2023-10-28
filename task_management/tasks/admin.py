from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    model = Task
    list_display = ['title', 'user','status' ,'creation_date','deadline']

admin.site.register(Task,TaskAdmin)
