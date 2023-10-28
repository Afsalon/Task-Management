
from django.core.mail import send_mail
from decouple import config

def sendMail(data,email):
    subject = "Task Assignment"
    message = f"You have been assigned a new task: {data['title']}"
    from_email = config('EMAIL_HOST_USER')
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)