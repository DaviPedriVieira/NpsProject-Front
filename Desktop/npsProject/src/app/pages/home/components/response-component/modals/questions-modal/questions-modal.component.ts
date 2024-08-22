import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { GroupNotificationService } from 'src/app/services/group-notification-service/group-notification.service';
import { LoginService } from 'src/app/services/login-service/login.service';
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
  questions: QuestionModel[] = []; 
  authorized!: boolean; 
  questionId: number = 0
  selectedGrades: number[] = [];
  descriptions: string[] = [];

  constructor(private questionService: QuestionService, private loginService: LoginService, private answersService: AnswerService, private groupNotificationService: GroupNotificationService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();
    const username = localStorage.getItem('Username');

    if (username == null) {
      this.authorized == false;
      return
    } 

    this.loginService.isAuthorized(username).subscribe((response: boolean) => {
      this.authorized = response;
    });

    this.loadQuestions()
  }

  closeModal() {
    this.ResetArrays()
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
    this.questionService.GetQuestionsIds(this.formId).subscribe((data) => {
      const questionIdsList = data;
      this.PopulateAnswers(questionIdsList);
    })
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
    }
    this.SubmitAnswers(answers)
  }

  SubmitAnswers(answers: AnswerModel[]) {
    this.answersService.SubmitAnswers(answers).subscribe(() => {
      this.closeModal()
      this.groupNotificationService.notifyToCloseModals();
    })
  }

  ResetArrays() {
    this.selectedGrades = [];
    this.descriptions = [];
  }
}
