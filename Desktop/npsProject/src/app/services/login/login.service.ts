import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5014/api/Users';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  Login(username: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Login?name=${username}&password=${password}`, null, {withCredentials: true})
  }

  Logout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Logout`, null, {withCredentials: true});
  }

  isAuthenticated(): boolean {
    const cookie = this.cookieService.get('NpsProject.AuthCookie');
    return cookie != '';
  }

  isAuthorized(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/Type?username=${username}`, {withCredentials: true});
  }
}
