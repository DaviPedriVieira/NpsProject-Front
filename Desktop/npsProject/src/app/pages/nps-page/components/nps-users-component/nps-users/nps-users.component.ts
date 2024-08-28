import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-nps-users',
  templateUrl: './nps-users.component.html',
  styleUrls: ['./nps-users.component.scss']
})
export class NpsUsersComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
  }
}
