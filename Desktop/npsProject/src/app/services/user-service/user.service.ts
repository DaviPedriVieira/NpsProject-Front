import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  basePath: string = '/Users'

  constructor(private http: HttpClient) {}

  CreateUser(newUser: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.basePath, newUser)
  }
  
  GetUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.basePath)
  }

  GetUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.basePath}/${id}`)
  }

  GetPromoters(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.basePath}/Promoters`)
  }

  GetPassives(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.basePath}/Passives`)
  }

  GetDetractors(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.basePath}/Detractors`)
  }
}
