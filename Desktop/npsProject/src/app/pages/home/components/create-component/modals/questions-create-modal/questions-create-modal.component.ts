import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormService } from 'src/app/services/form-service/form.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service'; 
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-questions-create-modal',
  templateUrl: './questions-create-modal.component.html',
  styleUrls: ['./questions-create-modal.component.scss']
})
export class QuestionsCreateModalComponent {
  @ViewChild('createQuestionsModal') createQuestionsModal!: ElementRef<HTMLDialogElement>
  questions: QuestionModel[] = [];
  invalidInputs: boolean = false;
  forms: FormModel[] = []
  selectedFormId: string = '';

  constructor(private formsService: FormService, private questionsService: QuestionService, private notificationService: NotificationService) {}

  openModal() {
    this.createQuestionsModal.nativeElement.showModal()
    this.GetForms()
    this.CreateQuestion()
  }

  closeModal() {
    this.questions = [];
    this.createQuestionsModal.nativeElement.close()
  }

  GetForms() {
    this.formsService.GetForms().subscribe((data) => {
      this.forms = data
    })
  }

  CreateQuestion() {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '', answers: [] }
    this.questions.push(newQuestion)
  }

  DeleteQuestion(index: number) {
    this.questions.splice(index, 1)
  }

  AreAnyEmptyInputs() {
    if(!this.selectedFormId.trim())
      return true

    if(this.questions.length == 0)
      return true

    for (let question of this.questions) {
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

    for (let question of this.questions){
      question.formId = Number(this.selectedFormId);
    }

    this.questionsService.CreateQuestion(this.questions).subscribe(() => {
      this.closeModal()
      this.notificationService.notifyItemCreated()
    })
  }
}
