import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5014/api';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  Login(username: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Users/Login?name=${username}&password=${password}`, null, {withCredentials: true})
  }

  Logout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Users/Logout`, null, {withCredentials: true});
  }

  isAuthenticated(): boolean {
    const cookie = this.cookieService.get('NpsProject.AuthCookie');
    return cookie != '';
  }
}
