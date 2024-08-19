import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionModel } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:5014/api/Questions';

  constructor(private http: HttpClient) {}

  GetQuestions(formId: number): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.apiUrl}/Form/${formId}`, {withCredentials: true})
  }

  GetQuestionsIds(formId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids/Form/${formId}`, {withCredentials: true})
  }

  CreateQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${this.apiUrl}`, question, {withCredentials: true})
  }

  DeleteQuestion(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, {withCredentials: true})
  }

  UpdateQuestion(id: number, newName: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}?newName=${newName}`, null, {withCredentials: true})
  }
}
