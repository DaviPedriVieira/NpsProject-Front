import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FormModel } from 'src/app/interfaces/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  basePath: string = '/Forms'
  private formsSubject = new BehaviorSubject<FormModel[]>([])
  forms$ = this.formsSubject.asObservable()

  constructor(private http: HttpClient) { }

  GetForms(): Observable<FormModel[]> {
    return this.http.get<FormModel[]>(this.basePath).pipe(
      tap(forms => this.formsSubject.next(forms))
    )
  }

  GetFormById(id: number): Observable<FormModel> {
    return this.http.get<FormModel>(`${this.basePath}/${id}`)
  }

  GetFormsByGroupId(groupId: number): Observable<FormModel[]> {
    return this.http.get<FormModel[]>(`${this.basePath}/Group/${groupId}`).pipe(
      tap(forms => this.formsSubject.next(forms))
    )
  }

  CreateForm(form: FormModel): Observable<FormModel> {
    return this.http.post<FormModel>(this.basePath, form).pipe(
      tap((newForm) => {
        this.formsSubject.value.push(newForm)
        this.formsSubject.next(this.formsSubject.value)
      })
    )
  }

  DeleteForm(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.basePath}/${id}`).pipe(
      tap(() => {
        const forms = this.formsSubject.value.filter(form => form.id != id)
        this.formsSubject.next(forms)
      })
    )
  }

  UpdateForm(id: number, newName: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.basePath}/${id}?newName=${newName}`, null).pipe(
      tap(() => {
        const forms = this.formsSubject.value.map(form =>
          form.id == id ? { ...form, name: newName } : form
        )
        this.formsSubject.next(forms)
      })
    )
  }
}
