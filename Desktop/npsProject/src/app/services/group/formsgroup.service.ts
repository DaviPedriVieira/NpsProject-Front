import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsGroupModel } from '../../interfaces/forms-group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsGroupService {

  private apiUrl = 'http://localhost:5014/api/FormsGroups';

  constructor(private http: HttpClient) {}

  GetFormsGroups(): Observable<FormsGroupModel[]> {
    return this.http.get<FormsGroupModel[]>(`${this.apiUrl}`, {withCredentials: true})
  }

  CreateFormsGroup(group: FormsGroupModel): Observable<FormsGroupModel> {
    return this.http.post<FormsGroupModel>(`${this.apiUrl}`, group, {withCredentials: true})
  }

  DeleteFormsGroup(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  UpdateFormsGroup(id: number, group: FormsGroupModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, group, {withCredentials: true})
  }
}
