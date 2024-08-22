import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NpsService {

  private apiUrl = 'http://localhost:5014/api/Nps/NpsScore';

  constructor(private http: HttpClient) {}

  GetNpsScore(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}`, {withCredentials: true})
  }
}
