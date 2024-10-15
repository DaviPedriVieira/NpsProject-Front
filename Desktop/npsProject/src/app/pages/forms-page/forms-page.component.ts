import { Component, OnInit, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormService } from 'src/app/services/form-service/form.service';
import { LoginService } from 'src/app/services/login-service/login.service';
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
  authorized: boolean = false
  protected search: string = ''

  constructor(private formsService: FormService, private loginService: LoginService) {}

  async ngOnInit(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    await this.loadForms()
  
    this.formsService.forms$.subscribe(data => [
      this.forms = data,
      this.filterForms(this.search)
    ])
  }
  
  async loadForms(): Promise<void> {
    const data = await firstValueFrom(this.formsService.GetForms())
    this.forms = data
  }

  filterForms(search: string): void {
    if(search) {
      this.search = search
      this.forms = this.forms.filter(form => 
        form.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )    
    } 
    else {
      this.formsService.forms$.subscribe(data => this.forms = data)
    }
  }

  openFormsCreateModal(): void {
    this.formsCreateModal.openModal()
  }

  openCheckAnswersModal(): void {
    this.checkAnswersModal.openModal();
  }
}
