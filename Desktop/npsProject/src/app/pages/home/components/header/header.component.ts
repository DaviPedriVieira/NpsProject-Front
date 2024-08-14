import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  nome: string | null = ''

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('Username');
  }

  Logout() {
    this.loginService.Logout().subscribe()
    this.router.navigate(['/login'])
  }
}
