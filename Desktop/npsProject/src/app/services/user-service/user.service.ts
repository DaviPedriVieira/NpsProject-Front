import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5014/api/Users';

  constructor(private http: HttpClient) {}

  GetUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}`, {withCredentials: true})
  }

  GetUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  GetPromoters(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/Promoters`, {withCredentials: true})
  }

  GetPassives(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/Passives`, {withCredentials: true})
  }

  GetDetractors(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/Detractors`, {withCredentials: true})
  }
}
