from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from comment.serializers import CommentSerializer,CommentPostSerializer
from comment.models import Comment
from tasks.models import Task
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

# Create your views here.

User = get_user_model()


# GET
class CommentAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def get(self, request, task_id , format=None):
        try:
            comments = Comment.objects.filter(task = task_id)
            serializer = self.serializer_class(comments, many=True)
            serialized_data = serializer.data
            return Response(serialized_data,status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_204_NO_CONTENT)
        
# POST
class CommentPostAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentPostSerializer
    def post(self, request, task_id,  format=None):
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                task = Task.objects.get(id = task_id)
                serializer.save(task=task,user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
