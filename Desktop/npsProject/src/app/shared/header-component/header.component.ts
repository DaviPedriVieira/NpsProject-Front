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

  Logout(): void {
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/login'])
    }) 
  }

  ChangeScreen(route: string): void {
    localStorage.setItem('LastRoute', route)
    this.router.navigate([route])
  }
}
