import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsGroupModel } from '../../interfaces/forms-group';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsGroupService {
  basePath: string = '/FormsGroups'
  private formsGroupsSubject = new BehaviorSubject<FormsGroupModel[]>([])
  formsGroups$ = this.formsGroupsSubject.asObservable()

  constructor(private http: HttpClient) {}

  GetFormsGroups(): Observable<FormsGroupModel[]> {
    return this.http.get<FormsGroupModel[]>(this.basePath).pipe(
      tap(groups => this.formsGroupsSubject.next(groups))
    )
  }

  GetFormsGroupById(id: number): Observable<FormsGroupModel> {
    return this.http.get<FormsGroupModel>(`${this.basePath}/${id}`)
  }

  CreateFormsGroup(group: FormsGroupModel): Observable<FormsGroupModel> {
    return this.http.post<FormsGroupModel>(this.basePath, group).pipe(
      tap((newGroup) => {
        this.formsGroupsSubject.value.push(newGroup)
        this.formsGroupsSubject.next(this.formsGroupsSubject.value)
      })
    )
  }

  DeleteFormsGroup(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.basePath}/${id}`).pipe(
      tap(() => {
        const groups = this.formsGroupsSubject.value.filter(group => group.id != id)
        this.formsGroupsSubject.next(groups)
      })
    )
  }

  UpdateFormsGroup(id: number, newName: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.basePath}/${id}?newName=${newName}`, null).pipe(
      tap(() => {
        const groups = this.formsGroupsSubject.value.map(group => 
          group.id == id ? {...group, name: newName} : group
        )
        this.formsGroupsSubject.next(groups)
      })
    )
  }
}
