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
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent
  newGroup: FormsGroupModel = { id: 0, name: '', forms: [] };
  protected invalidInputs: boolean = false;
  errorMessage: string = ''

  constructor(private formsGroupService: FormsGroupService) { }

  openModal(): void {
    this.formsmodal.nativeElement.showModal();
  }

  closeModal(): void {
    this.ResetVariables();
    this.formsmodal.nativeElement.close();
  }

  CreateForm(): void {
    const newForm: FormModel = { id: 0, groupId: 0, name: '', questions: [] }
    this.newGroup.forms.push(newForm)
  }

  CreateQuestion(index: number): void {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '' }
    this.newGroup.forms[index].questions.push(newQuestion)
  }

  DeleteForm(index: number): void {
    this.newGroup.forms.splice(index, 1)
  }

  DeleteQuestion(formIndex: number, questionIndex: number): void {
    this.newGroup.forms[formIndex].questions.splice(questionIndex, 1)
  }

  AreAnyEmptyInputs(): boolean {
    if (!this.newGroup.name.trim()) {
      this.errorMessage = 'O nome do grupo não pode ser vazio!'
      return true
    }

    if (this.newGroup.name.length > 50) {
      this.errorMessage = 'O nome do grupo tem limite de 50 caracteres!'
      return true
    }

    for (let form of this.newGroup.forms) {
      if (!form.name.trim()) {
        this.errorMessage = 'Nenhum nome de formulário pode ser vazio!'
        return true
      }

      if (form.name.length > 50) {
        this.errorMessage = 'Os nomes de formulários tem limite de 50 caracteres!'
        return true
      }

      for (let question of form.questions) {
        if (!question.content.trim()) {
          this.errorMessage = 'Nenhuma pergunta pode ser vazia!'
          return true
        }

        if (question.content.length > 150) {
          this.errorMessage = 'As perguntas tem limite de 150 caracteres!'
          return true
        }
      };
    };

    return false;
  }

  CreateGroup(): void {
    if (this.AreAnyEmptyInputs()) {
      this.invalidInputs = true;
      return
    }

    this.formsGroupService.CreateFormsGroup(this.newGroup).subscribe(() => {
      this.closeModal()
      this.sucessfulMessageModal.openModal()
    });
  }

  ResetVariables(): void {
    this.newGroup = { id: 0, name: '', forms: [] };
    this.invalidInputs = false;
  }
}
