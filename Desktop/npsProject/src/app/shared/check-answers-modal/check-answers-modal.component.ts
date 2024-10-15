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
  emptyList: boolean = false

  constructor(private answersService: AnswerService, private questionService: QuestionService, private userService: UserService) { }

  openModal(): void {
    this.GetQuestions()
    this.checkAnswersModal.nativeElement.showModal()
  }

  closeModal(): void {
    this.ResetVariables()
    this.selectedId = ''
    this.checkAnswersModal.nativeElement.close()
  }

  changeMode(): void {
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

  GetAnswersByQuestionId(): void {
    this.emptyList = false
    this.answersService.GetAnswersByQuestionId(Number(this.selectedId)).subscribe(data => {
      this.answers = data;

      if (this.answers.length == 0) {
        this.emptyList = true
        return
      }

      for (let i = 0; i < this.answers.length; i++) {
        this.userService.GetUserById(this.answers[i].userId).subscribe(data => {
          this.answers[i].username = data.name
        })
      }
    });
  }

  GetAnswersByUserId(): void {
    this.emptyList = false
    this.answersService.GetAnswersByUserId(Number(this.selectedId)).subscribe(data => {
      this.answers = data

      if (this.answers.length == 0) {
        this.emptyList = true
        return
      }

      for (let i = 0; i < this.answers.length; i++) {
        this.questionService.GetQuestionById(this.answers[i].questionId).subscribe(data => {
          this.answers[i].question = data.content
        })
      }
    });
  }

  GetQuestions(): void {
    this.questionService.GetQuestions().subscribe(data => {
      this.questions = data;
    });
  }

  GetUsers(): void {
    this.userService.GetUsers().subscribe(data => {
      this.users = data;
    });
  }

  ResetVariables(): void {
    this.emptyList = false
    this.answers = []
  }
}
