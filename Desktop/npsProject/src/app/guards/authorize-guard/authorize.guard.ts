import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    let authorized = false
    
    this.loginService.isAdmin().subscribe(data => {
      authorized = data
    });

    if (authorized) {
      this.router.navigate(['/home']);
      return false
    }
    
    return true 
  }
}
