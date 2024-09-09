import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authorized = localStorage.getItem('Role');

    if (authorized != 'Administrador') {
      this.router.navigate(['/home']);
      return false
    }
    
    return true 
  }
}
