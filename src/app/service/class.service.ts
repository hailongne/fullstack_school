import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Class } from '../model/school.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};

const apiUrl = 'http://127.0.0.1:8000/api/class';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  apiUrl = 'http://127.0.0.1:8000/api/class';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(`${apiUrl}/`).pipe();
  }

  find(id: number): Observable<Class> {
    return this.httpClient.get<Class>(`${apiUrl}/?id=${id}`).pipe();
  }

  createClass(dataClass: Class): Observable<Class> {
    return this.httpClient.post<Class>(`${apiUrl}/create/`, dataClass).pipe();
  }

  updateClass(id: number, dataClass: Class): Observable<Class> {
    return this.httpClient
      .patch<Class>(`${apiUrl}/update/${id}/`, dataClass)
      .pipe();
  }

  deleteClass(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${apiUrl}/${id}/delete/`).pipe();
  }
}
