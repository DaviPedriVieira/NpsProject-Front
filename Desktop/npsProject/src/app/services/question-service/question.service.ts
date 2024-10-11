import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { QuestionModel } from 'src/app/interfaces/question';
import { BaseService } from '../base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService<QuestionModel>{
  basePath: string = '/Questions'
  private questionsSubject = new BehaviorSubject<QuestionModel[]>([])
  questions$ = this.questionsSubject.asObservable()

  constructor(http: HttpClient) {
    super(http)
  }

  GetQuestions(): Observable<QuestionModel[]> {
    return this.Get(this.basePath).pipe(
      tap((questions) => this.questionsSubject.next(questions))
    )
  }

  GetQuestionsByFormId(formId: number): Observable<QuestionModel[]> {
    return this.GetByFatherId(`${this.basePath}/Form`, formId).pipe(
      tap((questions) => this.questionsSubject.next(questions))
    )
  }

  GetQuestionById(id: number): Observable<QuestionModel> {
    return this.GetById(this.basePath, id)
  }

  CreateQuestion(questions: QuestionModel[]): Observable<QuestionModel[]> {
    return this.BulkCreate(this.basePath, questions).pipe(
      tap((newQuestions) => {
        this.questionsSubject.value.push(...newQuestions)
        this.questionsSubject.next(this.questionsSubject.value)
      })
    )
  }

  DeleteQuestion(id: number): Observable<boolean> {
    return this.Delete(this.basePath, id).pipe(
      tap(() => {
        const questions = this.questionsSubject.value.filter(question => question.id != id)
        this.questionsSubject.next(questions)
      })
    )
  }

  UpdateQuestion(id: number, newName: string): Observable<boolean> {
    return this.Update(this.basePath, id, newName).pipe(
      tap(() => {
        const questions = this.questionsSubject.value.map(
          question => question.id == id ? {...question, content: newName} : question
        )
        this.questionsSubject.next(questions)
      })
    )
  }
}
