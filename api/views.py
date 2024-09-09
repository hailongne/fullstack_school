from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import School, ClassBySchool
from .serializers import SchoolSerializer, ClassBySchoolSerializer
from rest_framework import serializers
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Student
from .serializers import StudentSerializer


@api_view(['GET'])
def ApiOverview(request):
	api_urls = {
		'all_items': '/',
        'all_class': '/class',
		'Search by nameSchool': '/?school=name_school',
		'Search by id': '/?id=id',
		'Add': '/create',
		'Update': '/update/pk',
		'Delete': '/item/pk/delete',
        'Add Class': '/class/create',
		'Update Class': '/class/update/pk',
		'Delete Class': '/class/pk/delete'
	}

	return Response(api_urls)



@api_view(['POST'])
def add_school(request):
    school = SchoolSerializer(data=request.data)
 
    if School.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
 
    if school.is_valid():
        school.save()
        return Response(school.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    
    
@api_view(['GET'])
def view_school(request):
    id = request.query_params.get('id')
    
    if id:
        school = get_object_or_404(School, pk=id)
        serializer = SchoolSerializer(school)
        return Response(serializer.data)
    else:
        if request.query_params:
            school = School.objects.filter(**request.query_params.dict())
        else:
            school = School.objects.all()

        if school.exists():
            serializer = SchoolSerializer(school, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(['PATCH'])
def update_school(request, pk):
    school = get_object_or_404(School, pk=pk)
    data = SchoolSerializer(instance=school, data=request.data, partial=True)

    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

@api_view(['DELETE'])
def delete_shop(request, pk):
    school = get_object_or_404(School, pk=pk)
    school.delete()
    return Response(status=status.HTTP_202_ACCEPTED)



# Class



@api_view(['POST'])
def add_class(request):
    class_obj = ClassBySchoolSerializer(data=request.data)

    if ClassBySchool.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This class already exists')

    if class_obj.is_valid():
        class_obj.save()
        return Response(class_obj.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def view_class(request):
    id = request.query_params.get('id')
    
    if id:
        class_obj = get_object_or_404(ClassBySchool, pk=id)
        serializer = ClassBySchoolSerializer(class_obj)
        return Response(serializer.data)
    else:
        if request.query_params:
            class_obj = ClassBySchool.objects.filter(**request.query_params.dict())
        else:
            class_obj = ClassBySchool.objects.all()

        if class_obj.exists():
            serializer = ClassBySchoolSerializer(class_obj, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def update_class(request, pk):
    class_obj = get_object_or_404(ClassBySchool, pk=pk)
    data = ClassBySchoolSerializer(instance=class_obj, data=request.data, partial=True)

    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_class(request, pk):
    class_obj = get_object_or_404(ClassBySchool, pk=pk)
    class_obj.delete()
    return Response(status=status.HTTP_202_ACCEPTED)



@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_students(request, pk=None):
    if pk:
        try:
            student = Student.objects.get(pk=pk)
            serializer = StudentSerializer(student)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

@api_view(['PATCH'])
def update_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = StudentSerializer(student, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    
    student.delete()
    return Response({'message': 'Student deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
