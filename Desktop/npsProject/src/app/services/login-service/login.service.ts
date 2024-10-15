import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  basePath: string = '/Users'

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.basePath}/Login`, { username, password })
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('Username')
    return this.http.post<boolean>(`${this.basePath}/Logout`, null)
  }
  
  isAdmin(): Observable<boolean>  {
    const username = localStorage.getItem('Username')
    return this.http.get<boolean>(`${this.basePath}/Type?username=${username}`)
  }
}
