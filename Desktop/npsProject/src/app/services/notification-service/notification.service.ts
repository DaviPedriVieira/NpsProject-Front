import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private cookieExpired = new Subject<void>();

  constructor(private router: Router, private loginService: LoginService) {}

  cookieExpired$ = this.cookieExpired.asObservable();

  notifyCookieExpired() {
    this.loginService.logout()
    this.router.navigate(['/login'])
    setTimeout(() => {
      this.cookieExpired.next()
    })
  }
}
