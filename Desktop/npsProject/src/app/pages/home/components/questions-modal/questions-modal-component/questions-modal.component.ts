import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
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
  @Output() answersSubmited = new EventEmitter<void>();
  questions: QuestionModel[] = [];
  showDeleteModal: boolean = false;
  showUpdateModal: boolean = false;
  authorized!: boolean;
  questionId: number = 0
  questionIdsList: number[] = [];
  selectedGrades: number[] = [];
  descriptions: string[] = [];
  answers: AnswerModel[] = [];
  newAnswer!: AnswerModel;

  constructor(private questionService: QuestionService, private loginService: LoginService, private answersService: AnswerService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();

    const username = localStorage.getItem('Username');

    if (username != null) {
      this.loginService.isAuthorized(username).subscribe((response: boolean) => {
        this.authorized = response;
      });
    }
    else {
      this.authorized == false;
      return
    }

    this.loadQuestions()
  }

  closeModal() {
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
    console.log("")
  }

  openModals(event: MouseEvent, whichModal: string) {
    this.GetQuestionId(event);

    switch (whichModal) {
      case 'deleteModal':
        this.showDeleteModal = true
        setTimeout(() => {
          this.deleteModalComponent.openModal();
        });
        break

      case 'updateModal':
        this.showUpdateModal = true
        setTimeout(() => {
          this.updateModalComponent.openModal();
        });
        break
    }
  }

  GetQuestionsIds() {
    this.questionService.GetQuestionsIds(this.formId).subscribe((data) => {
      this.questionIdsList = data;
      this.PopulateAnswers();
    })
  }

  PopulateAnswers() {
    for (let i = 0; i < this.selectedGrades.length; i++) {
      this.newAnswer = {
        id: 0,
        userId: 0,
        grade: this.selectedGrades[i],
        description: this.descriptions[i] || '',
        questionId: this.questionIdsList[i],
        date: new Date(),
      }

      this.answers[i] = this.newAnswer;
    }

    this.SubmitAnswers()
  }

  SubmitAnswers() {
    this.answersService.SubmitAnswers(this.answers).subscribe((data) => {
      this.closeModal()
      this.answersSubmited.emit()
      this.ResetArrays()
    })
  }

  ResetArrays() {
    this.questionIdsList = [];
    this.selectedGrades = [];
    this.descriptions = [];
    this.answers = [];
  }
}
