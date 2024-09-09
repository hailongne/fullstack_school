
from django.urls import path
from . import views
 
urlpatterns = [
    path('', views.ApiOverview, name='home'),
    path('create/', views.add_school, name='add-school'),
    path('all/', views.view_school, name='view-school'),
    path('update/<int:pk>/', views.update_school, name='update-school'),
    path('school/<int:pk>/delete/', views.delete_shop, name='delete-school'),
    
    path('class/create/', views.add_class, name='add-class'),
    path('class/', views.view_class, name='view-class'),
    path('class/update/<int:pk>/', views.update_class, name='update-class'),
    path('class/<int:pk>/delete/', views.delete_class, name='delete-class'),
    
    path('students/', views.get_students, name='get_students'),  
    path('students/<int:pk>/', views.get_students, name='get_student'),  
    path('students/create/', views.create_student, name='create_student'),  
    path('students/update/<int:pk>/', views.update_student, name='update_student'), 
    path('students/delete/<int:pk>/', views.delete_student, name='delete_student'),
]