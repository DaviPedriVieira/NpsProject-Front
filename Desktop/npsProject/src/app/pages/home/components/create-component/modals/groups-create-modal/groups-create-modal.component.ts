import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { QuestionModel } from 'src/app/interfaces/question';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-groups-create-modal',
  templateUrl: './groups-create-modal.component.html',
  styleUrls: ['./groups-create-modal.component.scss']
})
export class GroupsCreateModalComponent {
  @ViewChild('createGroupsModal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent
  newGroup: FormsGroupModel = { id: 0, name: '', forms: [] };
  invalidInputs: boolean = false;

  constructor(private formsGroupService: FormsGroupService, private notificationService: NotificationService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();
  }

  closeModal() {
    this.ResetVariables();
    this.formsmodal.nativeElement.close();
  }

  CreateForm() {
    const newForm: FormModel = { id: 0, groupId: 0, name: '', questions: [] }
    this.newGroup.forms.push(newForm)
  }

  CreateQuestion(index: number) {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '' }
    this.newGroup.forms[index].questions.push(newQuestion)
  }

  DeleteForm(index: number) {
    this.newGroup.forms.splice(index, 1)
  }

  DeleteQuestion(formIndex: number, questionIndex: number) {
    this.newGroup.forms[formIndex].questions.splice(questionIndex, 1)
  }

  AreAnyEmptyInputs() {
    if (!this.newGroup.name.trim())
      return true

    for (let form of this.newGroup.forms) {
      if (!form.name.trim())
        return true

      for (let question of form.questions) {
        if (!question.content.trim())
          return true
      };
    };

    return false;
  }

  CreateGroup() {
    if (this.AreAnyEmptyInputs()) {
      this.invalidInputs = true;
      return
    }

    this.formsGroupService.CreateFormsGroup(this.newGroup).subscribe({
      next: (data) => {
        this.closeModal()
        this.notificationService.notifyGroupCreated();
        this.sucessfulMessageModal.openModal()
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  ResetVariables() {
    this.newGroup = { id: 0, name: '', forms: [] };
    this.invalidInputs = false;
  }
}
