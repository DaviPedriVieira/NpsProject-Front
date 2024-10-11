import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormService } from 'src/app/services/form-service/form.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-questions-create-modal',
  templateUrl: './questions-create-modal.component.html',
  styleUrls: ['./questions-create-modal.component.scss']
})
export class QuestionsCreateModalComponent {
  @ViewChild('createQuestionsModal') createQuestionsModal!: ElementRef<HTMLDialogElement>
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent
  @Input() formId!: number;
  forms: FormModel[] = []
  newQuestions: QuestionModel[] = [];
  invalidInputs: boolean = false;
  errorMessage: string = ''

  constructor(private formsService: FormService, private questionsService: QuestionService, private CookieService: CookieService) { }

  openModal() {
    this.createQuestionsModal.nativeElement.showModal()
    this.GetForms()
    this.CreateQuestion()
  }

  closeModal() {
    this.invalidInputs = false
    this.newQuestions = [];
    this.createQuestionsModal.nativeElement.close()
  }

  GetForms() {
    this.formsService.forms$.subscribe({
      next: (data) => {
        this.forms = data
      },
      error: (error) => {
        const httpError = error as HttpErrorResponse
        if (httpError.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    })

    if(this.forms.length == 0){
      this.formsService.GetForms().subscribe( {
        next: (data) => {
          this.forms = data;
        },
        error: (error: HttpErrorResponse) => {
          if(error.status == 401)
            this.CookieService.notifyCookieExpired()
        }
      })
    }
  }

  CreateQuestion() {
    const newQuestion: QuestionModel = {id: 0, formId: 0, content: ''}
    this.newQuestions.push(newQuestion)
  }

  DeleteQuestion(index: number) {
    this.newQuestions.splice(index, 1)
  }

  AreAnyEmptyInputs() {
    if (this.formId == undefined){
      this.errorMessage = 'O formulário não pode ser em branco!'
      return true
    }
    
    for (let question of this.newQuestions) {
      if (!question.content.trim()){
        this.errorMessage = 'Nenhuma pergunta pode ser vazia!'
        return true
      }

      if (question.content.length > 150){
        this.errorMessage = 'As perguntas tem limite de 150 caracteres!'
        return true
      }
    };

    return false;
  }

  SubmitQuestions() {
    if (this.AreAnyEmptyInputs()) {
      this.invalidInputs = true;
      return
    }

    for (let question of this.newQuestions) {
      question.formId = this.formId
    }

    this.questionsService.CreateQuestion(this.newQuestions).subscribe({
      next: () => {
        this.sucessfulMessageModal.openModal()
        this.closeModal()
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }
}
