import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() toWhichScreen!: string;
  authorized: boolean = false;
  nome: string = ''

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('Username') || '';

    this.loginService.isAuthorized(this.nome).subscribe((data) => {
      this.authorized = data;
    })
  }

  Logout() {
    this.loginService.Logout().subscribe()
    this.router.navigate(['/login'])
  }

  goToHomeScreen() {
    this.router.navigate(['/home'])
  }

  goToNpsScreen() {
    this.router.navigate(['/nps'])
  }
}
