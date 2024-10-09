import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageDialog!: SucessfulMessageModalComponent; 
  username: string = '';
  password: string = '';
  invalidInputs: boolean = false;
  errorMessage: string = '';

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('Username') != null) {
      this.router.navigate([localStorage.getItem('LastRoute') || '/home'])
    }
  }

  CreateUser(): void { 
    if (this.username.trim() == '' && this.password.trim() == '') {
      this.errorMessage = 'Nenhum dos campos pode ser vazio!';
      this.invalidInputs = true;
      return;
    }

    const newUser: UserModel = {id: 0, name: this.username, password: this.password, type: 1}

    this.UserService.CreateUser(newUser).subscribe((data) => {
      if(data){
        this.openMessageModal()
      }
    },
    (error) => {
      this.errorMessage = `${error.error}`;
      this.invalidInputs = true;
    })
  }

  openMessageModal() {
    this.sucessfulMessageDialog.navigateToHome = true
    this.sucessfulMessageDialog.openModal()
  }
}
