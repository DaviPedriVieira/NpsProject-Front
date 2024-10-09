import { Component, OnInit, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionsModalComponent } from '../../shared/questions-modal/questions-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { FormService } from 'src/app/services/form-service/form.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { CheckAnswersModalComponent } from '../../shared/check-answers-modal/check-answers-modal.component';
import { FormsCreateModalComponent } from '../../shared/forms-create-modal/forms-create-modal.component';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})
export class FormsPageComponent implements OnInit{
  @ViewChild(QuestionsModalComponent) questionsModalComponent!: QuestionsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @ViewChild(FormsCreateModalComponent) formsCreateModal!: FormsCreateModalComponent;
  forms: FormModel[] = []
  filteredForms: FormModel[] = []
  authorized: boolean = false

  constructor(private formsService: FormService, private loginService: LoginService, private CookieService: CookieService) {}

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    this.loadForms()
  }
  
  loadForms() {
    this.formsService.GetForms().subscribe({
      next: (data) => {
        this.forms = data;
        this.filteredForms = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    })
  }

  filterForms(search: string) {
    if(search) {
      this.filteredForms = this.forms.filter(form => 
        form.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )    
    } 
    else {
      this.filteredForms = this.forms
    }
  }

  openFormsCreateModal() {
    this.formsCreateModal.openModal()
  }

  openCheckAnswersModal() {
    this.checkAnswersModal.openModal();
  }

  openQuestionsModal(id: number, formName: string): void {
    this.questionsModalComponent.formId = id;
    this.questionsModalComponent.formName = formName
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }

  openDeleteModal(id: number): void {
    this.deleteModalComponent.id = id
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number, formName: string): void {
    this.updateModalComponent.id = id
    this.updateModalComponent.name = formName
    this.updateModalComponent.openModal();
  }
}
