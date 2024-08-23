import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
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
  @Input() formId!: number;
  @Input() authorized!: boolean;
  questions: QuestionModel[] = []; 
  questionId: number = 0
  invalidInputs: boolean = false
  selectedGrades: number[] = [];
  descriptions: string[] = [];

  constructor(private questionService: QuestionService, private answersService: AnswerService, private notificationService: NotificationService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();
    this.loadQuestions()
  }

  closeModal() {
    this.ResetVariables()
    this.formsmodal.nativeElement.close();
  }

  loadQuestions() {
    this.questionService.GetQuestions(this.formId).subscribe(data => {
      this.questions = data;
    })
  }

  GetQuestionId(event: MouseEvent) {
    const clickedOption = event.target as HTMLElement
    const questionDiv = clickedOption.closest('.questions-div');
    if (questionDiv) {
      const formIdDiv = questionDiv.querySelector('#questionId-div');

      if (formIdDiv)
        this.questionId = Number(formIdDiv.textContent);
    }
  }

  openUpdateModal(event: MouseEvent) {
    this.GetQuestionId(event);
    setTimeout(() => {
      this.updateModalComponent.openModal();
    });
  }

  openDeleteModal(event: MouseEvent) {
    this.GetQuestionId(event);
    setTimeout(() => {
      this.deleteModalComponent.openModal();
    });
  }

  GetAllQuestionsIds() {
    if(!this.ValidateSelects()){
      this.invalidInputs = true;
      return
    }

    this.questionService.GetQuestionsIds(this.formId).subscribe((data) => {
      const questionIdsList = data;
      this.PopulateAnswers(questionIdsList);
    })
  }

  ValidateSelects(): boolean {
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

  PopulateAnswers(questionIdsList: number[]) {
    const answers: AnswerModel[] = []

    for (let i = 0; i < this.selectedGrades.length; i++) {
      const newAnswer: AnswerModel = {
        id: 0,
        userId: 0,
        grade: this.selectedGrades[i],
        description: this.descriptions[i] || '',
        questionId: questionIdsList[i],
        date: new Date(),
      }
      answers[i] = newAnswer;
      console.log(this.selectedGrades[i])
    }
    this.SubmitAnswers(answers)
  }

  SubmitAnswers(answers: AnswerModel[]) {
    this.answersService.SubmitAnswers(answers).subscribe(() => {
      this.closeModal()
      this.notificationService.notifyAnswersSubmited();
    })
  }

  ResetVariables() {
    this.selectedGrades = [];
    this.descriptions = [];
    this.invalidInputs = false;
  }
}
