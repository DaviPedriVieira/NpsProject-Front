import { Component, ViewChild } from '@angular/core';
import { QuestionModel } from 'src/app/interfaces/question';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { CheckAnswersModalComponent } from '../../shared/check-answers-modal/check-answers-modal.component';
import { QuestionsCreateModalComponent } from '../../shared/questions-create-modal/questions-create-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent {
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @ViewChild(QuestionsCreateModalComponent) questionsCreateModal!: QuestionsCreateModalComponent;
  questions: QuestionModel[] = []
  authorized: boolean = false
  search: string = ''

  constructor(private questionsService: QuestionService, private loginService: LoginService, private CookieService: CookieService) {}

  async ngOnInit(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => this.authorized = data);

    await this.loadQuestions()

    this.questionsService.questions$.subscribe(data => {
      this.questions = data,
      this.filterQuestions(this.search)
    })
  }
  
  async loadQuestions(): Promise<void> {
    try {
      const data = await firstValueFrom(this.questionsService.GetQuestions())
      this.questions = data
    } catch (error) {
      const httpError = error as HttpErrorResponse
      if (httpError.status == 401)
        this.CookieService.notifyCookieExpired()
    }
  }

  filterQuestions(search: string) {
    if(search) {
      this.search = search
      this.questions = this.questions.filter(question => 
        question.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )    
    } 
    else {
      this.questionsService.questions$.subscribe(data => this.questions = data)
    }
  }

  openQuestionsCreateModal() {
    this.questionsCreateModal.openModal()
  }

  openCheckAnswersModal() {
    this.checkAnswersModal.openModal();
  }
}

