import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/interfaces/user';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel>{

  basePath: string = '/Users'

  constructor(http: HttpClient) {
    super(http)
  }

  CreateUser(newUser: UserModel): Observable<UserModel> {
    return this.Create(this.basePath, newUser)
  }
  
  GetUsers(): Observable<UserModel[]> {
    return this.Get(this.basePath)
  }

  GetUserById(id: number): Observable<UserModel> {
    return this.GetById(this.basePath, id)
  }

  GetPromoters(): Observable<UserModel[]> {
    return this.Get(`${this.basePath}/Promoters`)
  }

  GetPassives(): Observable<UserModel[]> {
    return this.Get(`${this.basePath}/Passives`)
  }

  GetDetractors(): Observable<UserModel[]> {
    return this.Get(`${this.basePath}/Detractors`)
  }
}
