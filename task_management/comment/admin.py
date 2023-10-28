from django.contrib import admin
from comment.models import Comment

# Register your models here.

class CommentAdmin(admin.ModelAdmin):
    model = Comment
    list_display = ['user', 'task','comment','creation_date']

admin.site.register(Comment,CommentAdmin)