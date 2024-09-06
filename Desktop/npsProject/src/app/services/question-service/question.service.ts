import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionModel } from 'src/app/interfaces/question';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService<QuestionModel>{

  basePath: string = '/Questions'

  constructor(http: HttpClient) {
    super(http)
  }

  GetQuestions(): Observable<QuestionModel[]> {
    return this.Get(this.basePath)
  }

  GetQuestionsByFormId(formId: number): Observable<QuestionModel[]> {
    return this.GetByFatherId(`${this.basePath}/Form`, formId)
  }

  GetQuestionById(id: number): Observable<QuestionModel> {
    return this.GetById(this.basePath, id)
  }

  CreateQuestion(questions: QuestionModel[]): Observable<QuestionModel[]> {
    return this.BulkCreate(this.basePath, questions)
  }

  DeleteQuestion(id: number): Observable<boolean> {
    return this.Delete(this.basePath, id)
  }

  UpdateQuestion(id: number, newName: string): Observable<boolean> {
    return this.Update(this.basePath, id, newName)
  }
}
