import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsGroup } from '../../interfaces/forms-group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsGroupService {

  private apiUrl = 'http://localhost:5014/api/FormsGroups';

  constructor(private http: HttpClient) {}

  GetFormsGroups(): Observable<FormsGroup[]> {
    return this.http.get<FormsGroup[]>(`${this.apiUrl}`, {withCredentials: true})
  }

  CreateFormsGroup(group: FormsGroup): Observable<FormsGroup> {
    return this.http.post<FormsGroup>(`${this.apiUrl}`, group, {withCredentials: true})
  }

  DeleteFormsGroup(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  UpdateFormsGroup(id: number, group: FormsGroup): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, group, {withCredentials: true})
  }
}
