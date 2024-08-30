import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    const username = localStorage.getItem('Username');

    if (username == null) {
      this.router.navigate(['/home']);
      return false
    }

    this.loginService.isAuthorized(username).subscribe(isAdm => {
      if (!isAdm) {
        this.router.navigate(['/home']);  
      }
    });
    
    return true 
  }
}
