import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { School } from '../model/school.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
const apiUrl = 'http://127.0.0.1:8000/api';
// const apiUrl = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<School[]> {
    return this.httpClient.get<School[]>(`${apiUrl}/all`).pipe();
  }

  find(id: number): Observable<School> {
    return this.httpClient.get<School>(`${apiUrl}/all/?id=${id}`).pipe();
  }

  createSchool(school: School): Observable<School> {
    return this.httpClient.post<School>(`${apiUrl}/create/`, school).pipe();
  }

  updateSchool(id: number, school: School): Observable<School> {
    return this.httpClient
      .patch<School>(`${apiUrl}/update/${id}/`, school)
      .pipe();
  }

  deleteSchool(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${apiUrl}/school/${id}/delete/`)
      .pipe();
  }
}
