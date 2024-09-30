import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, AfterViewInit {
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageDialog!: SucessfulMessageModalComponent; 
  username: string = '';
  password: string = '';
  invalidInputs: boolean = false;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) { }
  
  ngOnInit(): void {
    if (localStorage.getItem('Username') != null) {
      const LastRoute = localStorage.getItem('LastRoute') || '/home'
      this.router.navigate([LastRoute])
    }
  }
  
  ngAfterViewInit(): void {
    this.notificationService.cookieExpired$.subscribe(() => {
      this.sucessfulMessageDialog.openModal()
    })
  }

  canSubmit(): boolean {
    return this.username.trim() !== '' && this.password.trim() !== '';
  }

  Login(): void {
    if (!this.canSubmit()) {
      this.errorMessage = 'Nenhum dos campos pode ser vazio!';
      this.invalidInputs = true;
      return;
    }

    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('Username', `${response.name}`);
          localStorage.setItem('Role', response.type == 0 ? 'Administrador' : 'Usuário');
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

  closeModal(): void {
    this.sucessfulMessageDialog.closeModal()
  }
}

