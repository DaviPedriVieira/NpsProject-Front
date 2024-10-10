import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { QuestionsCreateModalComponent } from '../questions-create-modal/questions-create-modal.component';
import { CheckAnswersModalComponent } from '../check-answers-modal/check-answers-modal.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-questions-modal',
  templateUrl: './questions-modal.component.html',
  styleUrls: ['./questions-modal.component.scss']
})
export class QuestionsModalComponent {
  @ViewChild('questionsmodal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(QuestionsCreateModalComponent) questionsCreateModal!: QuestionsCreateModalComponent;
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModalComponent!: SucessfulMessageModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @Input() formId!: number;
  @Input() formName!: string;
  authorized!: boolean;
  questions: QuestionModel[] = [];
  selectedGrades: number[] = [];
  descriptions: string[] = [];
  invalidInputs: boolean = false
  errorMessage: string = ''

  constructor(
    private questionService: QuestionService,
    private answersService: AnswerService, 
    private CookieService: CookieService,
    private loginService: LoginService
  ) { }

  async openModal(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    await this.loadQuestions()

    this.questionService.questions$.subscribe(data => {
      this.questions = data
    })
    
    this.formsmodal.nativeElement.showModal();
  }

  closeModal(): void {
    this.formsmodal.nativeElement.close();
    this.ResetVariables()
  }

  async loadQuestions(): Promise<void> {
    try {
      const data = await firstValueFrom(this.questionService.GetQuestionsByFormId(this.formId))
      this.questions = data
    } catch (error) {
      const httpError = error as HttpErrorResponse
      if (httpError.status == 401)
        this.CookieService.notifyCookieExpired()
    }
  }

  openCheckAnswersModal() {
    this.checkAnswersModal.openModal()
  }
  
  openQuestionsCreateModal() {
    this.questionsCreateModal.formId = this.formId
    this.questionsCreateModal.openModal();
  }

  ValidSelects(): boolean {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.selectedGrades[i] == null) {
        this.errorMessage = 'Todas as perguntas são obrigatórias!'
        return false
      }

      if (this.descriptions[i] && this.descriptions[i].length > 200) {
        this.errorMessage = 'As descrições tem limite de 200 caracteres!'
        return false
      }
    }

    return true
  }

  PopulateAnswers(): void {
    if (!this.ValidSelects()) {
      this.invalidInputs = true;
      return
    }

    const answers: AnswerModel[] = []

    for (let i = 0; i < this.selectedGrades.length; i++) {
      answers[i] = { id: 0, userId: 0, grade: this.selectedGrades[i], description: this.descriptions[i], questionId: this.questions[i].id };
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
        if (error.status == 401)
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
