import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuestionModel } from 'src/app/interfaces/question';

@Component({
  selector: 'app-check-answers-modal',
  templateUrl: './check-answers-modal.component.html',
  styleUrls: ['./check-answers-modal.component.scss']
})
export class CheckAnswersModalComponent {
  @ViewChild('checkAnswersModal') checkAnswersModal!: ElementRef<HTMLDialogElement>
  selectedUserId: string = ''
  selectedQuestionId: string = ''
  questions: QuestionModel[] = []
  consultedQuestion: QuestionModel = {id: 0, formId: 0, content: '', answers: []}

  openModal() {
    this.checkAnswersModal.nativeElement.showModal()
  }

  closeModal() {
    this.checkAnswersModal.nativeElement.close()
  }
}
