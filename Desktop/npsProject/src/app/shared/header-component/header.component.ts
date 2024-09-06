import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() currentScreen!: string;
  authorized: boolean = false;
  nome: string = ''

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('Username') || '';
    this.authorized = localStorage.getItem('Role') == 'Administrador' ? true : false;
  }

  Logout() {
    this.loginService.logout().subscribe(() => {
      localStorage.removeItem('Username')
      localStorage.removeItem('Role')
      this.router.navigate(['/login'])
    }) 
  }

  goToHomeScreen() {
    localStorage.setItem('LastRoute', '/home')
    this.router.navigate(['/home'])
  }
  
  goToNpsScreen() {
    localStorage.setItem('LastRoute', '/nps')
    this.router.navigate(['/nps'])
  }
}
