import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerModel } from 'src/app/interfaces/answer';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})
export class FormsPageComponent implements OnInit{
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModalComponent!: SucessfulMessageModalComponent;
  formId!: number;
  formName: string = '';
  questions: QuestionModel[] = []; 
  selectedGrades: number[] = [];
  descriptions: string[] = [];
  questionId: number = 0
  questionContent: string = ''
  invalidInputs: boolean = false
  authorized!: boolean;
  
  constructor(
    private formService: FormService, 
    private questionService: QuestionService, 
    private answersService: AnswerService, 
    private notificationService: NotificationService, 
    private router: Router, 
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });
    this.route.params.subscribe((params) => {
      this.formId = params['id']
      this.loadQuestions()
      this.GetForm()
    })
  }

  closeModal(): void {
    this.router.navigate([localStorage.getItem('LastRoute')])
    this.ResetVariables()
  }

  loadQuestions(): void {
    this.questionService.GetQuestionsByFormId(this.formId).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error : HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
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
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  openUpdateModal(id: number, questionContent: string): void {
    this.questionId = id
    this.questionContent = questionContent
    this.updateModalComponent.openModal();
  }

  openDeleteModal(id: number): void {
    this.questionId = id
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
          this.closeModal()
          this.sucessfulMessageModalComponent.openModal();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.status)
          if(error.status == 401)
            this.notificationService.notifyCookieExpired()
        }
      });
  }

  ResetVariables(): void {
    this.selectedGrades = [];
    this.descriptions = [];
    this.invalidInputs = false;
  }
}
