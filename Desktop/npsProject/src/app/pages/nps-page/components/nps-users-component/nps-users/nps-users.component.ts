import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-nps-users',
  templateUrl: './nps-users.component.html',
  styleUrls: ['./nps-users.component.scss']
})
export class NpsUsersComponent implements OnInit {

  promoters: UserModel[] = []
  passives: UserModel[] = []
  detractors: UserModel[] = []

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.GetPromoters()
    this.GetPassives()
    this.GetDetractors()
  }

  GetPromoters() {
    this.userService.GetPromoters().subscribe({
      next: (data) => {
        this.promoters = data
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  GetPassives() {
    this.userService.GetPassives().subscribe({
      next: (data) => {
        this.passives = data
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  GetDetractors() {
    this.userService.GetDetractors().subscribe({
      next: (data) => {
        this.detractors = data
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }
}
