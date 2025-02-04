from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import EducationPeoject
from programming_language.serializers import ProgrammingLanguageSerializer,ProgrammerExpertiseSerializer
from rest_framework.exceptions import ValidationError

from auths.serializers import CustomUserSerializer


class ProjectSerializer(ModelSerializer):
    language = ProgrammingLanguageSerializer(many=True)
    expertise = ProgrammerExpertiseSerializer(many=True)
    user = CustomUserSerializer(read_only=True)
    class Meta:
        model = EducationPeoject
        fields = [
            "id",
            "type_class",
            "class_session",
            "educational_heading",
            'description',
            "educational_heading_file",
            "price",
            "discount",
            "created_at",
            "updated_at",
            "start_date",
            "end_date",
            "buffer_date",
            "is_deleted",
            "language",
            "expertise",
            "user"
        ]
        
        

