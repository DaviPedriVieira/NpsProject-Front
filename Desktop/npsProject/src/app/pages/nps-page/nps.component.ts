import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss']
})
export class NpsComponent implements OnInit{

  authorized: boolean = false

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.loginService.isAdmin().subscribe({
      next: data => {
        this.authorized = data
        if(!data) {
          localStorage.setItem('LastRoute', '/home')
          this.router.navigate(['/home'])
        }
      },
      error: error => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    })
  }
}
