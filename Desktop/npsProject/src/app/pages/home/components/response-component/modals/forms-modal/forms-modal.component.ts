import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormModel } from 'src/app/interfaces/form';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from '../questions-modal/questions-modal.component';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  authorized!: boolean;
  forms: FormModel[] = [];
  formId: number = 0

  constructor(private formService: FormService, private notificationService: NotificationService) { }

  openModal(): void {
    this.authorized = localStorage.getItem('Role') == 'Administrador' ? true : false;
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

  openQuestionsModal(id: number): void {
    this.formId = id;
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }

  openDeleteModal(id: number): void {
    this.formId = id;
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number): void {
    this.formId = id;
    this.updateModalComponent.openModal();
  }
}
