import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  authorized: boolean = false;
  
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('Username');

    if(username == null) {
      this.authorized == false;
      return
    }

    this.loginService.isAuthorized(username).subscribe(response => {
      this.authorized = response;
    });
  }
}
