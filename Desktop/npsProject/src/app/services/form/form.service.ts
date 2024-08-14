import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:5014/api/Forms';

  constructor(private http: HttpClient) {}

  GetFormsByGroupId(groupId: number): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.apiUrl}/Group/${groupId}`, {withCredentials: true})
  }

  CreateForm(form: Form): Observable<Form> {
    return this.http.post<Form>(`${this.apiUrl}`, form, {withCredentials: true})
  }

  DeleteForm(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  UpdateForm(id: number, form: Form): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, form, {withCredentials: true})
  }
}
