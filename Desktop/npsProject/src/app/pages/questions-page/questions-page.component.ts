import { Component, ViewChild } from '@angular/core';
import { QuestionModel } from 'src/app/interfaces/question';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { CheckAnswersModalComponent } from '../home/components/response-component/modals/check-answers-modal/check-answers-modal.component';
import { QuestionsCreateModalComponent } from '../home/components/response-component/modals/questions-create-modal/questions-create-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent {
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @ViewChild(QuestionsCreateModalComponent) questionsCreateModal!: QuestionsCreateModalComponent;
  formId: number = 0
  formName: string = '' 
  questions: QuestionModel[] = []
  filteredQuestions: QuestionModel[] = []
  authorized: boolean = false

  constructor(private questionsService: QuestionService, private loginService: LoginService, private CookieService: CookieService) {}

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    this.loadQuestions()
  }
  
  loadQuestions() {
    this.questionsService.GetQuestions().subscribe({
      next: (data) => {
        this.questions = data;
        this.filteredQuestions = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    })
  }

  filterQuestions(search: string) {
    if(search) {
      this.filteredQuestions = this.questions.filter(question => 
        question.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )    
    } 
    else {
      this.filteredQuestions = [...this.questions]
    }
  }

  openQuestionsCreateModal() {
    this.questionsCreateModal.openModal()
  }

  openCheckAnswersModal() {
    this.checkAnswersModal.openModal();
  }

  openDeleteModal(id: number): void {
    this.formId = id;
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number, question: string): void {
    this.formId = id;
    this.formName = question
    this.updateModalComponent.openModal();
  }
}

