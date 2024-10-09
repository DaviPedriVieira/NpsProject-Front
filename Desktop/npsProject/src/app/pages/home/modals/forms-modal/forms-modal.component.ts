import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormModel } from 'src/app/interfaces/form';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from '../../../../shared/questions-modal/questions-modal.component';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login-service/login.service';
import { FormsCreateModalComponent } from '../../../../shared/forms-create-modal/forms-create-modal.component';
import { CheckAnswersModalComponent } from '../../../../shared/check-answers-modal/check-answers-modal.component';
import { SearchComponentComponent } from 'src/app/shared/search-component/search-component.component';

@Component({
  selector: 'app-forms-modal',
  templateUrl: './forms-modal.component.html',
  styleUrls: ['./forms-modal.component.scss']
})
export class FormsModalComponent {
  @ViewChild('formsmodal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(QuestionsModalComponent) questionsModalComponent!: QuestionsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(FormsCreateModalComponent) formsCreateModal!: FormsCreateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @ViewChild(SearchComponentComponent) SearchComponent!: SearchComponentComponent;
  @Input() groupId!: number;
  @Input() groupName!: string;
  forms: FormModel[] = [];
  filteredForms: FormModel[] = [];
  authorized!: boolean;

  constructor(private formService: FormService, private CookieService: CookieService, private loginService: LoginService) { }

  openModal(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });
    this.formsmodal.nativeElement.showModal();
    this.loadForms()
  }
  
  closeModal(): void {
    this.SearchComponent.resetSearch()
    this.formsmodal.nativeElement.close();
  }
  
  loadForms(): void {
    this.formService.GetFormsByGroupId(this.groupId).subscribe({
      next: (data) => {
        this.forms = data;
        this.filteredForms = data
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

  openCheckAnswersModal() {
    this.checkAnswersModal.openModal();
  }

  openFormsCreateModal() {
    this.formsCreateModal.openModal();
  }

  openQuestionsModal(id: number, formName: string): void {
    this.questionsModalComponent.formId = id;
    this.questionsModalComponent.formName = formName
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }

  openDeleteModal(id: number): void {
    this.deleteModalComponent.id = id;
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number, formName: string): void {
    this.updateModalComponent.id = id;
    this.updateModalComponent.name = formName
    this.updateModalComponent.openModal();
  }
}
