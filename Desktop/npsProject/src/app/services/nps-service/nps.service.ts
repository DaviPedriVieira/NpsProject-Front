import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class NpsService extends BaseService<number> {

  basePath: string = '/Nps'

  constructor(http: HttpClient) {
    super(http)
  }

  GetNpsScore(): Observable<number> {
    return this.GetScore(this.basePath)
  }
}
