import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-groups-create-modal',
  templateUrl: './groups-create-modal.component.html',
  styleUrls: ['./groups-create-modal.component.scss']
})
export class GroupsCreateModalComponent {
  @ViewChild('createGroupsModal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModalComponent!: SucessfulMessageModalComponent
  newGroup: FormsGroupModel = { id: 0, name: '', forms: [] };
  invalidInputs: boolean = false;
  showSucessfulMessageModal: boolean = false;

  constructor(private formsGroupService: FormsGroupService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();
  }

  closeModal() {
    this.newGroup = { id: 0, name: '', forms: [] };
    this.formsmodal.nativeElement.close();
  }

  CreateForm() {
    const newForm: FormModel = { id: 0, groupId: 0, name: '', questions: [] }
    this.newGroup.forms.push(newForm)
  }

  CreateQuestion(index: number) {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '', answers: [] }
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

  Submit() {
    if (this.AreAnyEmptyInputs()) {
      this.invalidInputs = true;
      return
    }

    this.formsGroupService.CreateFormsGroup(this.newGroup).subscribe(() => {
      this.ShowSucessfulMessageModal()
    })
  }

  ShowSucessfulMessageModal() {
    this.showSucessfulMessageModal = true
    setTimeout(() => {
      this.sucessfulMessageModalComponent.openModal();
    });
  }
}
