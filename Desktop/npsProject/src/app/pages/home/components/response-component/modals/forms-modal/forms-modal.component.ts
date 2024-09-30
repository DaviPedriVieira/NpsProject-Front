import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormModel } from 'src/app/interfaces/form';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from '../questions-modal/questions-modal.component';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
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
  @Input() groupName!: string;
  authorized!: boolean;
  forms: FormModel[] = [];
  formId: number = 0
  formName: string = ''

  constructor(private formService: FormService, private notificationService: NotificationService, private loginService: LoginService) { }

  openModal(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });
    this.formsmodal.nativeElement.show();
    this.loadForms()
  }

  closeModal(): void {
    this.formsmodal.nativeElement.close();
  }

  loadForms(): void {
    this.formService.GetFormsByGroupId(this.groupId).subscribe({
      next: (data) => {
        this.forms = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    })
  }

  openQuestionsModal(id: number, formName: string): void {
    this.formId = id;
    this.formName = formName
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }

  openDeleteModal(id: number): void {
    this.formId = id;
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number, formName: string): void {
    this.formId = id;
    this.formName = formName
    this.updateModalComponent.openModal();
  }
}
