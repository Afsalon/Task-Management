# Generated by Django 4.2.6 on 2023-10-27 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0005_delete_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='title',
            field=models.CharField(max_length=25, unique=True),
        ),
    ]