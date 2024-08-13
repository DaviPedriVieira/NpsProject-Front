import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsGroup } from '../interfaces/forms-group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsGroupService {

  private apiUrl = 'http://localhost:5014/api';

  constructor(private http: HttpClient) {}

  GetFormsGroups(): Observable<FormsGroup[]> {
    return this.http.get<FormsGroup[]>(`${this.apiUrl}/FormsGroups`, {withCredentials: true})
  }
}
