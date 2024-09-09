import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/school.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
const apiUrl = 'http://127.0.0.1:8000/api/students';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${apiUrl}`).pipe();
  }

  find(id: number): Observable<Student> {
    return this.http.get<Student>(`${apiUrl}/${id}`).pipe();
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${apiUrl}/create/`, student).pipe();
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.patch<Student>(`${apiUrl}/update/${id}/`, student).pipe();
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/delete/${id}/`).pipe();
  }
}
