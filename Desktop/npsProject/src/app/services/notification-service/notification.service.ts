import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private groupCreated = new Subject<void>();
  private cookieExpired = new Subject<void>();

  constructor(private router: Router, private loginService: LoginService) {}

  groupCreated$ = this.groupCreated.asObservable();
  cookieExpired$ = this.cookieExpired.asObservable();

  notifyGroupCreated() {
    this.groupCreated.next()
  }

  notifyCookieExpired() {
    this.loginService.logout()
    localStorage.removeItem('Username')
    localStorage.removeItem('Role')
    this.router.navigate(['/login'])
    setTimeout(() => {
      this.cookieExpired.next()
    })
  }
}
