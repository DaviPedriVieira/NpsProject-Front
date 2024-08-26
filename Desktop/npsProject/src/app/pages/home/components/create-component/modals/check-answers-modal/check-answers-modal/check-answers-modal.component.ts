import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { UserModel } from 'src/app/interfaces/user';
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
  users: UserModel[] = [];
  answers: AnswerModel[] = []
  mode: string = 'questionMode'

  constructor(private answersService: AnswerService, private questionService: QuestionService, private userService: UserService) { }

  openModal() {
    this.GetQuestions()
    this.GetUsers()
    this.checkAnswersModal.nativeElement.showModal()
  }

  closeModal() {
    this.selectedId = ''
    this.answers = []
    this.checkAnswersModal.nativeElement.close()
  }

  changeMode() {
    this.mode = this.mode == 'questionMode' ? 'userMode' : 'questionMode';
    this.answers = []
  }

  GetAnswersByQuestionId() {
    this.answersService.GetAnswersByQuestionId(Number(this.selectedId)).subscribe(data => {
      this.answers = data;

      for (let index = 0; index < this.answers.length; index++) {
        this.userService.GetUserById(this.answers[index].userId).subscribe(response => {
          this.answers[index].username = response.name
        })
      }
    })
  }

  GetAnswersByUserId() {
    this.answersService.GetAnswersByUserId(Number(this.selectedId)).subscribe(data => {
      this.answers = data;

      for (let index = 0; index < this.answers.length; index++) {
        this.questionService.GetQuestionById(this.answers[index].questionId).subscribe(response => {
          this.answers[index].questionContent = response.content
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
}
