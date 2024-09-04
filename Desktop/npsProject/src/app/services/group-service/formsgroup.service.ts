import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsGroupModel } from '../../interfaces/forms-group';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class FormsGroupService extends BaseService<FormsGroupModel>{

  basePath: string = '/FormsGroups'

  constructor(http: HttpClient) {
    super(http);
  }

  GetFormsGroups(): Observable<FormsGroupModel[]> {
    return this.Get(this.basePath)
  }

  CreateFormsGroup(group: FormsGroupModel): Observable<FormsGroupModel> {
    return this.Create(this.basePath, group)
  }

  DeleteFormsGroup(id: number): Observable<boolean> {
    return this.Delete(this.basePath, id)
  }

  UpdateFormsGroup(id: number, newName: string): Observable<boolean> {
    return this.Update(this.basePath, id, newName)
  }
}
