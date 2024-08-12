import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5014/api';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  Login(username: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Users/Login?name=${username}&password=${password}`, null, {withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  Logout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Users/Logout`, null, {withCredentials: true});
  }

  isAuthenticated(): boolean {
    const cookie = this.cookieService.get('NpsProject.AuthCookie');
    return !!cookie;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
