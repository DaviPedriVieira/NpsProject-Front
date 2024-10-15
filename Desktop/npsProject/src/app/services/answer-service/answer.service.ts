import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModel } from 'src/app/interfaces/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  basePath: string = '/Answers'

  constructor(private http: HttpClient) { }

  SubmitAnswers(answers: AnswerModel[]): Observable<AnswerModel[]> {
    return this.http.post<AnswerModel[]>(this.basePath, answers);
  }

  GetAnswersByUserId(userId: number): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(`${this.basePath}/User/${userId}`);
  }

  GetAnswersByQuestionId(questionId: number): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(`${this.basePath}/Question/${questionId}`);
  }
}
