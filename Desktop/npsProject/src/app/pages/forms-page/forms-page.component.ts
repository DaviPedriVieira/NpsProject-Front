import { Component, OnInit, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormService } from 'src/app/services/form-service/form.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { CheckAnswersModalComponent } from '../../shared/check-answers-modal/check-answers-modal.component';
import { FormsCreateModalComponent } from '../../shared/forms-create-modal/forms-create-modal.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})
export class FormsPageComponent implements OnInit{
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @ViewChild(FormsCreateModalComponent) formsCreateModal!: FormsCreateModalComponent;
  forms: FormModel[] = []
  filteredForms: FormModel[] = []
  authorized: boolean = false
  search: string = ''

  constructor(private formsService: FormService, private loginService: LoginService, private CookieService: CookieService) {}

  async ngOnInit(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    await this.loadForms()
  
    this.formsService.forms$.subscribe(data => [
      this.forms = data,
      this.filteredForms = data
    ])
  }
  
  async loadForms(): Promise<void> {
    try {
      const data = await firstValueFrom(this.formsService.GetForms())
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

  openFormsCreateModal() {
    this.formsCreateModal.openModal()
  }

  openCheckAnswersModal() {
    this.checkAnswersModal.openModal();
  }
}
