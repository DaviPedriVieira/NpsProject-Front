import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export class BaseService<T> {

  constructor(private http: HttpClient) { }

  private buildUrl(path: string): string {
    return `http://localhost:5014/api${path}`;
  }

  Get(path: string): Observable<T[]> {
    return this.http.get<T[]>(this.buildUrl(path), { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    );
  }

  GetByFatherId(path: string, fatherId: number): Observable<T[]> {
    return this.http.get<T[]>(this.buildUrl(`${path}/${fatherId}`), { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  GetById(path: string, id: number): Observable<T> {
    return this.http.get<T>(this.buildUrl(`${path}/${id}`), { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  Create(path: string, item: T): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), item, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  BulkCreate(path: string, item: T[]): Observable<T[]> {
    return this.http.post<T[]>(this.buildUrl(path), item, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  Update(path: string, id: number, newName: string): Observable<boolean> {
    return this.http.put<boolean>(this.buildUrl(`${path}/${id}?newName=${newName}`), null, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  Delete(path: string, id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.buildUrl(`${path}/${id}`), { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  GetScore(path: string): Observable<number> {
    return this.http.get<number>(this.buildUrl(path), { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error)
      })
    )
  }

  Login(path: string, username: string, password: string): Observable<T> {
    return this.http.post<T>(this.buildUrl(`${path}/?name=${username}&password=${password}`), null, { withCredentials: true })
  }

  Logout(path: string): Observable<boolean> {
    return this.http.post<boolean>(this.buildUrl(path), null, { withCredentials: true })
  }

  IsAdmin(path: string): Observable<boolean> {
    return this.http.get<boolean>(this.buildUrl(path), { withCredentials: true })
  }
}
