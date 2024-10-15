import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from '../services/cookie-service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `http://localhost:5014/api${req.url}`,
      withCredentials: true
    })

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401)
          this.cookieService.notifyCookieExpired()

        return throwError(() => error)
      })
    )
  }
}
