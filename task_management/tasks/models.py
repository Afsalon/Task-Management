from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

# Create your models here.
STATUS_CHOICES = (
    ("TO DO", "To Do"),
    ("IN PROGRESS", "In Progress"),
    ("COMPLETED", "Completed")
)

DEGREE_CHOICES = (
     ("1", "1"),
    ("2", "2"),
    ("3", "3")
)

User = get_user_model()


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=25,unique=True)
    description = models.TextField(max_length=5000)
    status =  models.CharField(max_length=15,
                  choices=STATUS_CHOICES,
                  default="----")
    creation_date = models.DateTimeField(auto_now_add=True, editable=False)
    deadline = models.DateField(blank=True, null= True)
    priority = models.CharField(max_length=1,
                                choices=DEGREE_CHOICES,
                                default = "3")

    class Meta:
        ordering = ['-creation_date']
    def __str__(self) -> str:
        return self.title
    
    def clean(self):
        if self.deadline and self.creation_date and self.deadline < self.creation_date.date():
            raise ValidationError("Deadline must be greater than or equal to the creation date.")
        