import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';

@Component({
  selector: 'app-form-questions-page',
  templateUrl: './form-questions-page.component.html',
  styleUrls: ['./form-questions-page.component.scss']
})
export class FormQuestionsPageComponent implements OnInit{
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModalComponent!: SucessfulMessageModalComponent;
  formId!: number;
  formName: string = '';
  questions: QuestionModel[] = []; 
  selectedGrades: number[] = [];
  descriptions: string[] = [];
  questionId: number = 0
  invalidInputs: boolean = false
  authorized!: boolean;
  
  constructor(
    private formService: FormService, 
    private questionService: QuestionService, 
    private answersService: AnswerService, 
    private CookieService: CookieService, 
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });
    
    this.route.params.subscribe((params) => {
      this.formId = params['id']
      localStorage.setItem('LastRoute', `form/${this.formId}`)
      this.loadQuestions()
      this.GetForm()
    })
  }

  loadQuestions(): void {
    this.questionService.GetQuestionsByFormId(this.formId).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error : HttpErrorResponse) => {
        if(error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }

  GetForm(): void {
    this.formService.GetFormById(this.formId).subscribe({
      next: (data) => {
        this.formName = data.name;
      },
      error: (error : HttpErrorResponse) => {
        if(error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }

  openUpdateModal(id: number, questionContent: string): void {
    this.updateModalComponent.id = id
    this.updateModalComponent.name = questionContent
    this.updateModalComponent.openModal();
  }
  
  openDeleteModal(id: number): void {
    this.updateModalComponent.id = id
    this.deleteModalComponent.openModal();
  }

  ValidSelects(): boolean {
    if(this.selectedGrades.length == 0){
      return false;
    }

    for (let i = 0; i < this.questions.length; i++) {
      if(this.selectedGrades[i] == null){
        return false
      }
    }

    return true
  }

  PopulateAnswers(): void {
    if(!this.ValidSelects()){
      this.invalidInputs = true;
      return
    }

    const answers: AnswerModel[] = []

    for (let i = 0; i < this.selectedGrades.length; i++) {
      const newAnswer: AnswerModel = {
        id: 0,
        userId: 0,
        grade: this.selectedGrades[i],
        description: this.descriptions[i],
        questionId: this.questions[i].id,
      }
      answers[i] = newAnswer;
    }
    this.SubmitAnswers(answers)
  }

  SubmitAnswers(answers: AnswerModel[]): void {
    this.answersService.SubmitAnswers(answers).subscribe({
        next: () => {
          this.sucessfulMessageModalComponent.openModal();
          this.ResetVariables()
        },
        error: (error: HttpErrorResponse) => {
          if(error.status == 401)
            this.CookieService.notifyCookieExpired()
        }
      });
  }

  ResetVariables(): void {
    this.selectedGrades = [];
    this.descriptions = [];
    this.invalidInputs = false;
  }
}
