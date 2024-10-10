import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FormModel } from 'src/app/interfaces/form';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseService<FormModel>{
  basePath: string = '/Forms'
  private formsSubject = new BehaviorSubject<FormModel[]>([])
  forms$ = this.formsSubject.asObservable()

  constructor(http: HttpClient) {
    super(http);
  }

  GetForms(): Observable<FormModel[]> {
    return this.Get(this.basePath).pipe(
      tap(forms => this.formsSubject.next(forms))
    )
  }

  GetFormById(id: number): Observable<FormModel> {
    return this.GetById(this.basePath, id)
  }

  GetFormsByGroupId(groupId: number): Observable<FormModel[]> {
    return this.GetByFatherId(`${this.basePath}/Group`, groupId).pipe(
      tap(forms => this.formsSubject.next(forms))
    )
  }

  CreateForm(form: FormModel): Observable<FormModel> {
    return this.Create(this.basePath, form)
  }

  DeleteForm(id: number): Observable<boolean> {
    return this.Delete(this.basePath, id).pipe(
      tap(() => {
        const forms = this.formsSubject.value.filter(form => form.id != id)
        this.formsSubject.next(forms)  
      })
    )
  }

  UpdateForm(id: number, newName: string): Observable<boolean> {
    return this.Update(this.basePath, id, newName).pipe(
      tap(() => {
        const forms = this.formsSubject.value.map(form => 
          form.id == id ? {...form, name: newName} : form
        )
        this.formsSubject.next(forms)
      })
    )
  }
}
