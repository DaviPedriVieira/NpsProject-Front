import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild('sucessMessageDialog') sucessfulMessageDialog!: ElementRef<HTMLDialogElement>; 
  username: string = '';
  password: string = '';
  invalidInputs: boolean = false;
  errorMessage: string = '';

  constructor(private UserService: UserService, private router: Router) {}
  canSubmit(): boolean {
    return this.username.trim() !== '' && this.password.trim() !== '';
  }

  CreateUser(){
    if (!this.canSubmit()) {
      this.errorMessage = 'Nenhum dos campos pode ser vazio!';
      this.invalidInputs = true;
      return;
    }

    const newUser: UserModel = {id: 0, name: this.username, password: this.password, type: 1}
    this.UserService.CreateUser(newUser).subscribe((data) => {
      if(data){
        this.sucessfulMessageDialog.nativeElement.showModal()
      }
    },
    (error) => {
      this.errorMessage = `${error.error}`;
      this.invalidInputs = true;
    })
  }

  goToLoginPage(){
    this.username = '';
    this.password = '';
    this.invalidInputs = false
    this.router.navigate(["/login"])
  }
}
