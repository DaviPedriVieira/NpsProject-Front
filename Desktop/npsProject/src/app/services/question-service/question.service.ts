import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:5014/api/Questions';

  constructor(private http: HttpClient) {}

  GetQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}`, {withCredentials: true})
  }

  CreateQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}`, question, {withCredentials: true})
  }

  DeleteQuestion(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  UpdateQuestion(id: number, question: Question): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, question, {withCredentials: true})
  }
}
