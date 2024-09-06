import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if(localStorage.getItem('Username') != null && localStorage.getItem('Role') != null){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
