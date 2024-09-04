import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModel } from 'src/app/interfaces/answer';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends BaseService<AnswerModel> {

  basePath: string = '/Answers'

  constructor(http: HttpClient) {
    super(http);
  }

  SubmitAnswers(answers: AnswerModel[]): Observable<AnswerModel[]> {
    return this.BulkCreate(this.basePath, answers);
  }

  GetAnswersByUserId(userId: number): Observable<AnswerModel[]> {
    return this.GetByFatherId(`${this.basePath}/User/`, userId);
  }

  GetAnswersByQuestionId(questionId: number): Observable<AnswerModel[]> {
    return this.GetByFatherId(`${this.basePath}/Question/`, questionId);
  }
}
