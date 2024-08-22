import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormService } from 'src/app/services/form-service/form.service';
import { GroupNotificationService } from 'src/app/services/group-notification-service/group-notification.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-forms-create-modal',
  templateUrl: './forms-create-modal.component.html',
  styleUrls: ['./forms-create-modal.component.scss']
})
export class FormsCreateModalComponent {
  @ViewChild('createFormsModal') createFormsModal!: ElementRef<HTMLDialogElement>
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent
  newForm: FormModel = {id: 0, groupId: 0, name: '', questions: []}
  invalidInputs: boolean = false;
  selectedGroupId: string = '';
  groups: FormsGroupModel[] = [];

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService, private groupNotificationService: GroupNotificationService) {}

  openModal() {
    this.createFormsModal.nativeElement.showModal();
    this.GetGroups()
  }

  closeModal() {
    this.ResetVariables();
    this.createFormsModal.nativeElement.close();
  }

  GetGroups() {
    this.formsGroupService.GetFormsGroups().subscribe((data) => {
      this.groups = data;
    })
  }

  CreateQuestion() {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '', answers: [] }
    this.newForm.questions.push(newQuestion)
  }

  DeleteQuestion(questionIndex: number) {
    this.newForm.questions.splice(questionIndex, 1)
  }

  AreAnyEmptyInputs() {
    if(!this.selectedGroupId.trim())
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
    this.formsService.CreateForm(this.newForm).subscribe(() => {
      this.closeModal()
      this.groupNotificationService.notifyGroupsCreated()
    })
  }

  ResetVariables() {
    this.newForm = {id: 0, groupId: 0, name: '', questions: []}
    this.invalidInputs = false;
  }
}
