import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerModel } from 'src/app/interfaces/answer';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { firstValueFrom } from 'rxjs';
import { FormModel } from 'src/app/interfaces/form';

@Component({
  selector: 'app-form-questions-page',
  templateUrl: './form-questions-page.component.html',
  styleUrls: ['./form-questions-page.component.scss']
})
export class FormQuestionsPageComponent implements OnInit {
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent;
  form: FormModel = { id: 0, name: '', groupId: 0, questions: [] };
  selectedGrades: number[] = [];
  descriptions: string[] = [];
  invalidInputs: boolean = false
  protected authorized!: boolean;

  constructor(
    private formService: FormService,
    private questionService: QuestionService,
    private answersService: AnswerService,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.form.id = params['id']
      localStorage.setItem('LastRoute', `form/${this.form.id}`)
    })

    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    this.GetFormById()
    await this.GetQuestions()

    this.questionService.questions$.subscribe(data => {
      this.form.questions = data
    })

  }

  async GetQuestions(): Promise<void> {
    const data = await firstValueFrom(this.questionService.GetQuestionsByFormId(this.form.id))
    this.form.questions = data
  }

  GetFormById(): void {
    this.formService.GetFormById(this.form.id).subscribe(data => {
      this.form.name = data.name
    })
  }

  openMessageModal(): void {
    this.sucessfulMessageModal.navigateToHome = true
    this.sucessfulMessageModal.openModal()
  }

  ValidateSelects(): boolean {
    if (this.selectedGrades.length == 0)
      return false;

    for (let i = 0; i < this.form.questions.length; i++) {
      if (this.selectedGrades[i] == null)
        return false
    }

    return true
  }

  PopulateAnswers(): void {
    if (!this.ValidateSelects()) {
      this.invalidInputs = true;
      return
    }

    const answers: AnswerModel[] = []

    for (let i = 0; i < this.selectedGrades.length; i++) {
      const newAnswer: AnswerModel = {
        id: 0,
        userId: 0,
        grade: this.selectedGrades[i],
        description: this.descriptions[i],
        questionId: this.form.questions[i].id,
      }
      answers[i] = newAnswer;
    }
    this.SubmitAnswers(answers)
  }

  SubmitAnswers(answers: AnswerModel[]): void {
    this.answersService.SubmitAnswers(answers).subscribe(() => {
      this.openMessageModal()
      this.ResetVariables()
    });
  }

  ResetVariables(): void {
    this.selectedGrades = [];
    this.descriptions = [];
    this.invalidInputs = false;
  }
}
