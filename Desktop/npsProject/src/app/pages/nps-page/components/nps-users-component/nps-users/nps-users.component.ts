import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.GetPromoters()
    this.GetPassives()
    this.GetDetractors()
  }

  GetPromoters() {
    this.userService.GetPromoters().subscribe(data => {
      this.promoters = data
    })
  }
  
  GetPassives() {
    this.userService.GetPassives().subscribe(data => {
      this.passives = data
    })
  }
  
  GetDetractors() {
    this.userService.GetDetractors().subscribe(data => {
      this.detractors = data
    })
  }
}
