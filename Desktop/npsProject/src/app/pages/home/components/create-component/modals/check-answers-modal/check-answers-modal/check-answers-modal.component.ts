import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-check-answers-modal',
  templateUrl: './check-answers-modal.component.html',
  styleUrls: ['./check-answers-modal.component.scss']
})
export class CheckAnswersModalComponent {
  @ViewChild('checkAnswersModal') checkAnswersModal!: ElementRef<HTMLDialogElement>
  selectedId: string = ''
  questions: QuestionModel[] = [];
  users: {id: number, name: string}[] = [];
  answers: AnswerModel[] = []
  mode: string = 'questionMode'
  answersListEmpty: boolean = false

  constructor(private answersService: AnswerService, private questionService: QuestionService, private userService: UserService) { }

  openModal() {
    this.GetQuestions()
    this.GetUsers()
    this.checkAnswersModal.nativeElement.showModal()
  }

  closeModal() {
    this.ResetVariables()
    this.selectedId = ''
    this.checkAnswersModal.nativeElement.close()
  }

  changeMode() {
    this.mode = this.mode == 'questionMode' ? 'userMode' : 'questionMode';
    this.ResetVariables()
  }

  GetAnswersByQuestionId() {
    this.answersListEmpty = false
    this.answersService.GetAnswersByQuestionId(Number(this.selectedId)).subscribe(data => {
      this.answers = data;

      if(this.answers.length == 0){
        this.answersListEmpty = true
        return
      }

      for (let i = 0; i < this.answers.length; i++) {
        this.userService.GetUserById(this.answers[i].userId).subscribe(response => {
          this.answers[i].username = response.name
        })
      }
    })
  }

  GetAnswersByUserId() {
    this.answersListEmpty = false
    this.answersService.GetAnswersByUserId(Number(this.selectedId)).subscribe(data => {
      this.answers = data;

      if(this.answers.length == 0){
        this.answersListEmpty = true
        return
      }

      for (let i = 0; i < this.answers.length; i++) {
        this.questionService.GetQuestionById(this.answers[i].questionId).subscribe(response => {
          this.answers[i].questionContent = response.content
        })
      }
    })
  }

  GetQuestions() {
    this.questionService.GetAllQuestions().subscribe(data => {
      this.questions = data;
    })
  }

  GetUsers() {
    this.userService.GetUsers().subscribe(data => {
      this.users = data;
    })
  }

  ResetVariables() {
    this.answersListEmpty = false
    this.answers = []
  }
}
