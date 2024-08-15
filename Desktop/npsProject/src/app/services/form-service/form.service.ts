import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormModel } from 'src/app/interfaces/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:5014/api/Forms';

  constructor(private http: HttpClient) {}

  GetFormsByGroupId(groupId: number): Observable<FormModel[]> {
    return this.http.get<FormModel[]>(`${this.apiUrl}/Group/${groupId}`, {withCredentials: true})
  }

  CreateForm(form: FormModel): Observable<FormModel> {
    return this.http.post<FormModel>(`${this.apiUrl}`, form, {withCredentials: true})
  }

  DeleteForm(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  UpdateForm(id: number, form: FormModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, form, {withCredentials: true})
  }
}
