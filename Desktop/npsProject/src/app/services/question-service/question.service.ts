import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { QuestionModel } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  basePath: string = '/Questions'
  private questionsSubject = new BehaviorSubject<QuestionModel[]>([])
  questions$ = this.questionsSubject.asObservable()

  constructor(private http: HttpClient) { }

  GetQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.basePath).pipe(
      tap((questions) => this.questionsSubject.next(questions))
    )
  }

  GetQuestionsByFormId(formId: number): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.basePath}/Form/${formId}`).pipe(
      tap((questions) => this.questionsSubject.next(questions))
    )
  }

  GetQuestionById(id: number): Observable<QuestionModel> {
    return this.http.get<QuestionModel>(`${this.basePath}/${id}`)
  }

  CreateQuestion(questions: QuestionModel[]): Observable<QuestionModel[]> {
    return this.http.post<QuestionModel[]>(this.basePath, questions).pipe(
      tap((newQuestions) => {
        this.questionsSubject.value.push(...newQuestions)
        this.questionsSubject.next(this.questionsSubject.value)
      })
    )
  }

  DeleteQuestion(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.basePath}/${id}`).pipe(
      tap(() => {
        const questions = this.questionsSubject.value.filter(question => question.id != id)
        this.questionsSubject.next(questions)
      })
    )
  }

  UpdateQuestion(id: number, newName: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.basePath}/${id}?newName=${newName}`, null).pipe(
      tap(() => {
        const questions = this.questionsSubject.value.map(
          question => question.id == id ? {...question, content: newName} : question
        )
        this.questionsSubject.next(questions)
      })
    )
  }
}
