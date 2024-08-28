import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5014/api/Users';

  constructor(private http: HttpClient) {}

  GetUsers(): Observable<{id: number, name: string}[]> {
    return this.http.get<{id: number, name: string}[]>(`${this.apiUrl}`, {withCredentials: true})
  }

  GetUserById(id: number): Observable<{id: number, name: string}> {
    return this.http.get<{id: number, name: string}>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  GetPromoters(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/Promoters`, {withCredentials: true})
  }

  GetPassives(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/Passives`, {withCredentials: true})
  }

  GetDetractors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/Detractors`, {withCredentials: true})
  }
}
