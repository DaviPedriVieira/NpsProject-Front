import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  invalidInputs: boolean = false;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['/home'])
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
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorMessage = 'Usuário ou senha incorretos!';
        this.invalidInputs = true;
      }
    );
  }
}

