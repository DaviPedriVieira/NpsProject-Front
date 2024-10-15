import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormModel } from 'src/app/interfaces/form';
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
  search: string = ''
  protected authorized!: boolean;

  constructor(private formService: FormService, private loginService: LoginService) { }

  async openModal(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    await this.loadForms()

    this.formService.forms$.subscribe(data => {
      this.forms = data
      this.filterForms(this.search)
    })

    this.formsmodal.nativeElement.showModal();
  }

  closeModal(): void {
    this.formsmodal.nativeElement.close();
  }

  async loadForms(): Promise<void> {
    const data = await firstValueFrom(this.formService.GetFormsByGroupId(this.groupId))
    this.forms = data
  }

  filterForms(search: string): void {
    if (search) {
      this.search = search
      this.forms = this.forms.filter(form =>
        form.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    }
    else {
      this.formService.forms$.subscribe(data => this.forms = data)
    }
  }

  openCheckAnswersModal(): void {
    this.checkAnswersModal.openModal();
  }

  openFormsCreateModal(): void {
    this.formsCreateModal.groupId = this.groupId
    this.formsCreateModal.openModal();
  }
}
