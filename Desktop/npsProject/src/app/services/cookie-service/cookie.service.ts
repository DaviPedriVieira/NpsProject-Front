import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieExpired = new Subject<void>();
  cookieExpired$ = this.cookieExpired.asObservable();

  constructor(private router: Router, private loginService: LoginService) {}

  notifyCookieExpired() {
    this.loginService.logout()
    this.router.navigate(['/login'])
    setTimeout(() => {
      this.cookieExpired.next()
    })
  }
}
