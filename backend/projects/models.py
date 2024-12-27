from django.db import models
from programming_language.models import *
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
User = get_user_model()
# Create your models here.
class EducationPeoject(models.Model):
    class_type =[
        
        ('public','عمومی'),
        ('private','خصوصی')
    
    ]
    class_session = models.IntegerField(default=0,blank=True,null=True)
    language = models.ManyToManyField(ProgrammingLanguage,related_name='project_language')
    expertise = models.ManyToManyField(ProgrammerExpertise,related_name='project_expertise')
    description = models.TextField()
    type_class = models.CharField(max_length=50,choices=class_type,default='عمومی') 
    educational_heading = models.TextField(blank=True,null=True)
    educational_heading_file = models.FileField(upload_to='static/project/files')
    price = models.IntegerField()
    discount = models.IntegerField()
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='project_user')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_date = models.DateTimeField(blank=True,null=True)
    end_date = models.DateTimeField(blank=True,null=True)
    buffer_date = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)
    image = models.ImageField(upload_to='static/project/image_project',null=True,blank=True)
    


    