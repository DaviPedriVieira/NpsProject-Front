import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageDialog!: SucessfulMessageModalComponent; 
  username: string = '';
  password: string = '';
  invalidInputs: boolean = false;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router, private CookieService: CookieService) { }
  
  ngOnInit(): void {
    if (localStorage.getItem('Username') != null) {
      this.router.navigate([localStorage.getItem('LastRoute') || '/home'])
    }
    
    this.CookieService.cookieExpired$.subscribe(() => {
      this.sucessfulMessageDialog.openModal()
    })
  }

  Login(): void {
    if (this.username.trim() == '' && this.password.trim() == '') {
      this.errorMessage = 'Nenhum dos campos pode ser vazio!';
      this.invalidInputs = true;
      return;
    }

    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('Username', `${response.name}`);
          this.router.navigate([localStorage.getItem('LastRoute') || '/home']);
        }
      },
      (error) => {
        this.errorMessage = `${error.error}`;
        this.invalidInputs = true;
      }
    );
  }
}

