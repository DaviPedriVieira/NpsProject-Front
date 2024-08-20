import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormModel } from 'src/app/interfaces/form';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from '../questions-modal/questions-modal.component';
import { LoginService } from 'src/app/services/login-service/login.service';

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
  @Input() groupId!: number;
  forms: FormModel[] = [];
  showDeleteModal: boolean = false;
  showUpdateModal: boolean = false;
  showQuestionsModal: boolean = false
  authorized!: boolean;
  formId: number = 0

  constructor(private formService: FormService, private loginService: LoginService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();

    const username = localStorage.getItem('Username');

    if (username != null) {
      this.loginService.isAuthorized(username).subscribe((response: boolean) => {
        this.authorized = response;
      });
    }
    else {
      this.authorized == false;
      return
    }

    this.loadForms()
  }

  closeModal() {
    this.formsmodal.nativeElement.close();
  }

  loadForms() {
    this.formService.GetFormsByGroupId(this.groupId).subscribe(data => {
      this.forms = data;
    })
  }

  GetFormId(event: MouseEvent) {
    const clickedOption = event.target as HTMLElement
    const formDiv = clickedOption.closest('.forms-div');
    if(formDiv){
      const groupIdDiv = formDiv.querySelector('#formId-div');

      if(groupIdDiv) 
        this.formId = Number(groupIdDiv.textContent);
    }
  }

  openModals(event: MouseEvent, whichModal: string) {
    this.GetFormId(event);

    switch (whichModal) {
      case 'questionsModal':
        this.showQuestionsModal = true
        setTimeout(() => {
          this.questionsModalComponent.openModal();
        });
        break

      case 'deleteModal':
        this.showDeleteModal = true
        setTimeout(() => {
          this.deleteModalComponent.openModal();
        });
        break

      case 'updateModal':
        this.showUpdateModal = true
        setTimeout(() => {
          this.updateModalComponent.openModal();
        });
        break 
    }
  }
}
