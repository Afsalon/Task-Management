from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tasks.serializers import TaskSerializer, TaskCreateSerializer
from tasks.models import Task
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from tasks.actions import sendMail
# Create your views here.

User = get_user_model()


# GET
class TasksAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer


    def get(self, request, format=None):
        try:
            tasks = Task.objects.all()
            serializer = self.serializer_class(tasks, many=True)
            serialized_data = serializer.data
            return Response(serialized_data,status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
# GET BY ID
class TaskIdAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get(self, request, task_id, format=None):
        try:
            task = Task.objects.get(pk = task_id)
            serializer = self.serializer_class(task)
            serialized_data = serializer.data
            return Response(serialized_data,status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
# POST
class TaskCreateAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskCreateSerializer
    def post(self, request, format=None):
        print(request.data)
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                user_id = request.data.get('user')
                user = User.objects.get(id = user_id)
                if request.user.is_superuser or (user == request.user):
                    serializer.save(user=user)
                    sendMail(serializer.validated_data, user.email)
                    return Response(serializer.data,status=status.HTTP_201_CREATED)
                else:
                    return Response({"error":"Only Admin can assign task to others"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# UPDATE
class TaskUpdateAPI(APIView):
    serializer_class = TaskCreateSerializer
    permission_classes = [IsAuthenticated]
    def put(self, request, task_id, format=None):
        try:
            task = Task.objects.get(id=task_id)
            serializer = self.serializer_class(task, data=request.data)
            if serializer.is_valid():
                user_id = request.data.get('user')
                user = User.objects.get(id=user_id)
                previous_user = Task.objects.get(id = task_id).user
                if request.user.is_superuser or (previous_user == request.user):
                    serializer.save(user=user)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"error":"You cannot update other user's task"}, status=status.HTTP_400_BAD_REQUEST)
        except Task.DoesNotExist:
            return Response({"error": "Task does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Delete 
class TaskDeleteAPI(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, task_id, format=None):
        try:
            task = Task.objects.get(id=task_id)
            previous_user = Task.objects.get(id = task_id).user
            if request.user.is_superuser or (previous_user == request.user):
                task.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"error":"You can only delte the tasks assigned to you"}, status = status.HTTP_400_BAD_REQUEST)
        except Task.DoesNotExist:
            return Response({"error": "Task does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)