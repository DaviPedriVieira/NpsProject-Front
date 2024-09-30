import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormModel } from 'src/app/interfaces/form';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseService<FormModel>{

  basePath: string = '/Forms'

  constructor(http: HttpClient) {
    super(http);
  }

  GetForms(): Observable<FormModel[]> {
    return this.Get(this.basePath)
  }

  GetFormById(id: number): Observable<FormModel> {
    return this.GetById(this.basePath, id)
  }

  GetFormsByGroupId(groupId: number): Observable<FormModel[]> {
    return this.GetByFatherId(`${this.basePath}/Group`, groupId)
  }

  CreateForm(form: FormModel): Observable<FormModel> {
    return this.Create(this.basePath, form)
  }

  DeleteForm(id: number): Observable<boolean> {
    return this.Delete(this.basePath, id)
  }

  UpdateForm(id: number, newName: string): Observable<boolean> {
    return this.Update(this.basePath, id, newName)
  }
}
