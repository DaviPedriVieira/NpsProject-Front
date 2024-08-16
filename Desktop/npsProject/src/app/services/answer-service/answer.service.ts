import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModel } from 'src/app/interfaces/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiUrl = 'http://localhost:5014/api/Answers';

  constructor(private http: HttpClient) {}

  SubmitAnswers(answers: AnswerModel[]): Observable<AnswerModel[]> {
    console.log('número de respostas no service: ' + answers.length)
    return this.http.post<AnswerModel[]>(`${this.apiUrl}`, answers, {withCredentials: true})
  }
}
