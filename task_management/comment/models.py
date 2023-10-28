from django.db import models
from django.contrib.auth import get_user_model
from tasks.models import Task
# Create your models here.

User = get_user_model()

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    comment = models.TextField(max_length=1000)
    creation_date = models.DateTimeField(auto_now_add=True,editable=False)

    def __str__(self):
        return str(self.pk)