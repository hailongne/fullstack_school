from rest_framework import serializers
from .models import ClassBySchool, School, Student

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'nameSchool', 'locationSchool', 'rating']

class ClassBySchoolSerializer(serializers.ModelSerializer):
    school_data = serializers.SerializerMethodField()  

    class Meta:
        model = ClassBySchool
        fields = ['id', 'nameClass', 'school_id', 'school_data']

    def get_school_data(self, obj):
        return SchoolSerializer(obj.school_id).data
    
    
class StudentSerializer(serializers.ModelSerializer):
    school_data = serializers.SerializerMethodField()  
    class_data = serializers.SerializerMethodField()  

    class Meta:
        model = Student
        fields = ['id', 'nameStudent', 'mssv', 'age', 'hometown', 'class_id', 'school_id', 'class_data','school_data']

    def get_school_data(self, obj):
        return SchoolSerializer(obj.school_id).data
    
    def get_class_data(self, obj):
        return ClassBySchoolSerializer(obj.class_id).data