import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NpsService {
  
  basePath: string = '/Nps'

  constructor(private http: HttpClient) {}

  GetNpsScore(): Observable<number> {
    return this.http.get<number>(this.basePath)
  }
}
