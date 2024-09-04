import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  invalidInputs: boolean = false;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      const LastRoute = localStorage.getItem('LastRoute') || '/home'
      this.router.navigate([LastRoute])
    }
  }

  canSubmit(): boolean {
    return this.username.trim() !== '' && this.password.trim() !== '';
  }

  Login() {
    if (!this.canSubmit()) {
      this.errorMessage = 'Nenhum dos campos pode ser vazio!';
      this.invalidInputs = true;
      return;
    }

    this.loginService.Login(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('Username', `${this.username}`);
          const LastRoute = localStorage.getItem('LastRoute') || '/home'
          this.router.navigate([LastRoute]);
        }
      },
      (error) => {
        this.errorMessage = `${error.error}`;
        this.invalidInputs = true;
      }
    );
  }
}

