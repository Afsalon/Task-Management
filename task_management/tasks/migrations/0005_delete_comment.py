# Generated by Django 4.2.6 on 2023-10-27 07:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_rename_comments_comment'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
