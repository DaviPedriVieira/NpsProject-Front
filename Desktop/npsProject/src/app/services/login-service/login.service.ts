import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/interfaces/user';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<UserModel>{

  basePath: string = '/Users'

  constructor(http: HttpClient) {
    super(http)
  }

  login(username: string, password: string): Observable<UserModel> {
    return this.Login(`${this.basePath}/Login`, username, password)
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('Username')
    localStorage.removeItem('Role')
    return this.Logout(`${this.basePath}/Logout`)
  }
  
  isAdmin(): Observable<boolean>  {
    const username = localStorage.getItem('Username')
    return this.IsAdmin(`${this.basePath}/Type?username=${username}`)
  }
}
