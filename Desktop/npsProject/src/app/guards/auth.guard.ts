import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    if(this.loginService.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
