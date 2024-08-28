import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss']
})
export class NpsComponent {
  
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const username = localStorage.getItem('Username');

    if(username == null) {
      this.router.navigate(['/home']);
      return
    }

    this.loginService.isAuthorized(username).subscribe(response => {
        if(!response){
          this.router.navigate(['/home']);
        }
    });
  }
}
