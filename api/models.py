
from django.db import models
 
class School(models.Model):
    id = models.AutoField(primary_key=True)
    nameSchool = models.CharField(max_length=255)
    locationSchool = models.CharField(max_length=255)
    rating = models.PositiveIntegerField()
 
    def __str__(self) -> str:
        return self.nameSchool
    
class ClassBySchool(models.Model):
    id = models.AutoField(primary_key=True)
    nameClass = models.CharField(max_length=255)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE) 
    
    def __str__(self) -> str:
        return self.nameClass
    
class Student(models.Model):
    id = models.AutoField(primary_key=True)
    nameStudent = models.CharField(max_length=255)
    # asdasdqwewq
    # test nha
    mssv = models.CharField(max_length=255)
    age = models.PositiveIntegerField()
    hometown = models.CharField(max_length=255)
    class_id = models.ForeignKey(ClassBySchool, on_delete=models.CASCADE) 
    school_id = models.ForeignKey(School, on_delete=models.CASCADE) 
    
    def __str__(self) -> str:
        return self.nameStudent
