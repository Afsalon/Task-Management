from rest_framework import serializers
from django.contrib.auth import get_user_model
from document.models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class DocumentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['image']