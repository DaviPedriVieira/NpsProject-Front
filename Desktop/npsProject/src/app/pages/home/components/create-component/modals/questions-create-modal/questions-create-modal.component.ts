import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormService } from 'src/app/services/form-service/form.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-questions-create-modal',
  templateUrl: './questions-create-modal.component.html',
  styleUrls: ['./questions-create-modal.component.scss']
})
export class QuestionsCreateModalComponent {
  @ViewChild('createQuestionsModal') createQuestionsModal!: ElementRef<HTMLDialogElement>
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent
  forms: FormModel[] = []
  newQuestions: QuestionModel[] = [];
  invalidInputs: boolean = false;
  selectedFormId: string = '';

  constructor(private formsService: FormService, private questionsService: QuestionService, private notificationService: NotificationService) { }

  openModal() {
    this.createQuestionsModal.nativeElement.show()
    this.GetForms()
    this.CreateQuestion()
  }

  closeModal() {
    this.newQuestions = [];
    this.createQuestionsModal.nativeElement.close()
  }

  GetForms() {
    this.formsService.GetForms().subscribe({
      next: (data) => {
        this.forms = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  CreateQuestion() {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '' }
    this.newQuestions.push(newQuestion)
  }

  DeleteQuestion(index: number) {
    this.newQuestions.splice(index, 1)
  }

  AreAnyEmptyInputs() {
    if (!this.selectedFormId.trim())
      return true

    if (this.newQuestions.length == 0)
      return true

    for (let question of this.newQuestions) {
      if (!question.content.trim())
        return true
    };

    return false;
  }

  SubmitQuestions() {
    if (this.AreAnyEmptyInputs()) {
      this.invalidInputs = true;
      return
    }

    for (let question of this.newQuestions) {
      question.formId = Number(this.selectedFormId);
    }

    this.questionsService.CreateQuestion(this.newQuestions).subscribe({
      next: () => {
        this.sucessfulMessageModal.openModal()
        this.closeModal()
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }
}
