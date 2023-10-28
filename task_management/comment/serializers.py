from rest_framework import serializers
from django.contrib.auth import get_user_model
from comment.models import Comment
from tasks.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = ['id', 'comment','creation_date','user','task']

class CommentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment']
