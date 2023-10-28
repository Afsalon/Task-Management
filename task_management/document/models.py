from django.db import models
from tasks.models import Task

# Create your models here.
class Document(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    image = models.FileField(upload_to='documents')
    creation_date = models.DateTimeField(auto_now_add=True)


    def __str__(self) -> str:
        return str(self.pk)
