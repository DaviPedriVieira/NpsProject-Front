import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';

@Component({
  selector: 'app-questions-modal',
  templateUrl: './questions-modal.component.html',
  styleUrls: ['./questions-modal.component.scss']
})
export class QuestionsModalComponent {
  @ViewChild('questionsmodal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModalComponent!: SucessfulMessageModalComponent;
  @Input() formId!: number;
  authorized!: boolean;
  questions: QuestionModel[] = []; 
  selectedGrades: number[] = [];
  descriptions: string[] = [];
  questionId: number = 0
  invalidInputs: boolean = false

  constructor(private questionService: QuestionService, private answersService: AnswerService, private notificationService: NotificationService) { }

  openModal(): void {
    this.authorized = localStorage.getItem('Role') == 'Administrador' ? true : false;
    this.formsmodal.nativeElement.show();
    this.loadQuestions()
  }

  closeModal(): void {
    this.formsmodal.nativeElement.close();
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

  openUpdateModal(id: number): void {
    this.questionId = id
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

    for (let i = 0; i < this.selectedGrades.length; i++) {
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
