import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseService<T> {
  private readonly apiUrl: string = ''

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:5014/api';
  }

  private buildUrl(path: string): string {
    return `${this.apiUrl}${path}`;
  }

  Get(path: string): Observable<T[]> {
    return this.http.get<T[]>(this.buildUrl(path), { withCredentials: true })
  }

  GetByFatherId(path: string, fatherId: number): Observable<T[]> {
    return this.http.get<T[]>(this.buildUrl(`${path}/${fatherId}`), { withCredentials: true })
  }

  GetById(path: string, id: number): Observable<T> {
    return this.http.get<T>(this.buildUrl(`${path}/${id}`), { withCredentials: true })
  }

  Create(path: string, item: T): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), item, { withCredentials: true })
  }

  BulkCreate(path: string, item: T[]): Observable<T[]> {
    return this.http.post<T[]>(this.buildUrl(path), item, { withCredentials: true })
  }
  
  Update(path: string, id: number, newName: string): Observable<boolean> {
    return this.http.put<boolean>(this.buildUrl(`${path}/${id}?newName=${newName}`), null, { withCredentials: true })
  }
  
  Delete(path: string, id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.buildUrl(`${path}/${id}`), { withCredentials: true })
  }

  GetScore(path: string): Observable<number> {
    return this.http.get<number>(path, {withCredentials: true})
  }
}
