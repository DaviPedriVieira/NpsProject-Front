import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-forms-modal',
  templateUrl: './forms-modal.component.html',
  styleUrls: ['./forms-modal.component.scss']
})
export class FormsModalComponent {
  @ViewChild('formsmodal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(FormsCreateModalComponent) formsCreateModal!: FormsCreateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @ViewChild(SearchComponentComponent) SearchComponent!: SearchComponentComponent;
  @Input() groupId!: number;
  @Input() groupName!: string;
  forms: FormModel[] = [];
  filteredForms: FormModel[] = [];
  authorized!: boolean;
  search: string = ''

  constructor(private formService: FormService, private CookieService: CookieService, private loginService: LoginService) { }

  async openModal(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });
    
    await this.loadForms()

    this.formService.forms$.subscribe(data => {
      this.forms = data
      this.filteredForms = data
    })

    this.formsmodal.nativeElement.showModal();
  }
  
  closeModal(): void {
    this.SearchComponent.resetSearch()
    this.formsmodal.nativeElement.close();
  }
  
  async loadForms(): Promise<void> {
    try {
      const data = await firstValueFrom(this.formService.GetFormsByGroupId(this.groupId))
      this.forms = data
      this.filteredForms = data
    } catch (error) {
      const httpError = error as HttpErrorResponse
      if (httpError.status == 401)
        this.CookieService.notifyCookieExpired()
    }
  }

  filterForms(search: string) {
    if(search) {
      this.search = search
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
    this.formsCreateModal.groupId = this.groupId
    this.formsCreateModal.openModal();
  }
}
