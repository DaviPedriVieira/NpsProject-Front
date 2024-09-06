import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-forms-create-modal',
  templateUrl: './forms-create-modal.component.html',
  styleUrls: ['./forms-create-modal.component.scss']
})
export class FormsCreateModalComponent {
  @ViewChild('createFormsModal') createFormsModal!: ElementRef<HTMLDialogElement>
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent
  newForm: FormModel = { id: 0, groupId: 0, name: '', questions: [] }
  invalidInputs: boolean = false;
  selectedGroupId: string = '';
  groups: FormsGroupModel[] = [];

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService, private notificationService: NotificationService) { }

  openModal() {
    this.createFormsModal.nativeElement.showModal();
    this.GetGroups()
  }

  closeModal() {
    this.ResetVariables();
    this.createFormsModal.nativeElement.close();
  }

  GetGroups() {
    this.formsGroupService.GetFormsGroups().subscribe({
      next: (data) => {
        this.groups = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  CreateQuestion() {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '' }
    this.newForm.questions.push(newQuestion)
  }

  DeleteQuestion(questionIndex: number) {
    this.newForm.questions.splice(questionIndex, 1)
  }

  AreAnyEmptyInputs() {
    if (!this.selectedGroupId.trim())
      return true

    if (!this.newForm.name.trim())
      return true

    for (let question of this.newForm.questions) {
      if (!question.content.trim())
        return true
    };

    return false;
  }

  CreateForm() {
    if (this.AreAnyEmptyInputs()) {
      this.invalidInputs = true;
      return
    }

    this.newForm.groupId = Number(this.selectedGroupId);

    this.formsService.CreateForm(this.newForm).subscribe({
      next: () => {
        this.closeModal()
        this.sucessfulMessageModal.openModal()
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 500)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  ResetVariables() {
    this.newForm = { id: 0, groupId: 0, name: '', questions: [] }
    this.invalidInputs = false;
  }
}
