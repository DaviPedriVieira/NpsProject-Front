import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsGroupModel } from '../../interfaces/forms-group';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class FormsGroupService extends BaseService<FormsGroupModel>{
  basePath: string = '/FormsGroups'
  private formsGroupsSubject = new BehaviorSubject<FormsGroupModel[]>([])
  formsGroups$ = this.formsGroupsSubject.asObservable()

  constructor(http: HttpClient) {
    super(http);
  }

  GetFormsGroups(): Observable<FormsGroupModel[]> {
    return this.Get(this.basePath).pipe(
      tap(groups => this.formsGroupsSubject.next(groups))
    )
  }

  GetFormsGroupById(id: number): Observable<FormsGroupModel> {
    return this.GetById(this.basePath, id)
  }

  CreateFormsGroup(group: FormsGroupModel): Observable<FormsGroupModel> {
    return this.Create(this.basePath, group)
  }

  DeleteFormsGroup(id: number): Observable<boolean> {
    return this.Delete(this.basePath, id).pipe(
      tap(() => {
        const groups = this.formsGroupsSubject.value.filter(group => group.id != id)
        this.formsGroupsSubject.next(groups)
      })
    )
  }

  UpdateFormsGroup(id: number, newName: string): Observable<boolean> {
    return this.Update(this.basePath, id, newName).pipe(
      tap(() => {
        const groups = this.formsGroupsSubject.value.map(group => 
          group.id == id ? {...group, name: newName} : group
        )
        this.formsGroupsSubject.next(groups)
      })
    )
  }
}
