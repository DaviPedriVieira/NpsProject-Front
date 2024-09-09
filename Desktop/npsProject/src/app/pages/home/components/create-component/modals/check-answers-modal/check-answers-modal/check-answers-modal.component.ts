import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { UserModel } from 'src/app/interfaces/user';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
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
  answersListEmpty: boolean = false

  constructor(private answersService: AnswerService, private questionService: QuestionService, private userService: UserService, private notificationService: NotificationService) { }

  openModal() {
    this.GetQuestions()
    this.checkAnswersModal.nativeElement.show()
  }

  closeModal() {
    this.ResetVariables()
    this.selectedId = ''
    this.checkAnswersModal.nativeElement.close()
  }

  changeMode() {
    if (this.mode == 'questionMode') {
      this.mode = 'userMode'
      this.GetUsers()
    } 
    else {
      this.mode = 'questionMode'
      this.GetQuestions()
    }

    this.ResetVariables()
  }

  GetAnswersByQuestionId() {
    this.answersListEmpty = false
    this.answersService.GetAnswersByQuestionId(Number(this.selectedId)).subscribe({
      next: (data) => {
        this.answers = data;

        if (this.answers.length == 0) {
          this.answersListEmpty = true
          return
        }

        for (let i = 0; i < this.answers.length; i++) {
          this.userService.GetUserById(this.answers[i].userId).subscribe(data => {
            this.answers[i].username = data.name
          })
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  GetAnswersByUserId() {
    this.answersListEmpty = false
    this.answersService.GetAnswersByUserId(Number(this.selectedId)).subscribe({
      next: (data) => {
        this.answers = data

        if (this.answers.length == 0) {
          this.answersListEmpty = true
          return
        }

        for (let i = 0; i < this.answers.length; i++) {
          this.questionService.GetQuestionById(this.answers[i].questionId).subscribe(data => {
            this.answers[i].question = data.content
          })
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  GetQuestions() {
    this.questionService.GetQuestions().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  GetUsers() {
    this.userService.GetUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  ResetVariables() {
    this.answersListEmpty = false
    this.answers = []
  }
}
