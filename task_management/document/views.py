
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from document.serializers import DocumentSerializer,DocumentPostSerializer
from document.models import Document
from tasks.models import Task
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

# Create your views here.

User = get_user_model()


# GET
class DocumentAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DocumentSerializer

    def get(self, request, task_id , format=None):
        try:
            documents = Document.objects.filter(task = task_id)
            serializer = self.serializer_class(documents, many=True)
            serialized_data = serializer.data
            return Response(serialized_data,status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_204_NO_CONTENT)
        
# POST
class DocumentPostAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DocumentPostSerializer
    def post(self, request, task_id,  format=None):
        try:
            print(task_id)
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                task = Task.objects.get(id = task_id)
                serializer.save(task=task)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
