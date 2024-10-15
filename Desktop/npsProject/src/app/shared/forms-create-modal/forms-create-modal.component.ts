import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormService } from 'src/app/services/form-service/form.service';
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
  @Input() groupId!: number;
  newForm: FormModel = { id: 0, groupId: 0, name: '', questions: [] }
  groups: FormsGroupModel[] = [];
  invalidInputs: boolean = false;
  errorMessage: string = ''

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService) { }

  openModal(): void {
    this.createFormsModal.nativeElement.showModal();
    this.GetGroups()
  }

  closeModal(): void {
    this.ResetVariables();
    this.createFormsModal.nativeElement.close();
  }

  GetGroups(): void {
    this.formsGroupService.formsGroups$.subscribe(data => {
      this.groups = data;
    });

    if (this.groups.length == 0) {
      this.formsGroupService.GetFormsGroups().subscribe(data => {
        this.groups = data;
      })
    }
  }

  CreateQuestion(): void {
    const newQuestion: QuestionModel = { id: 0, formId: 0, content: '' }
    this.newForm.questions.push(newQuestion)
  }

  DeleteQuestion(questionIndex: number): void {
    this.newForm.questions.splice(questionIndex, 1)
  }

  AreAnyEmptyInputs(): boolean {
    if (this.groupId == undefined) {
      this.errorMessage = 'O grupo não pode ser vazio'
      return true
    }

    if (!this.newForm.name.trim()) {
      this.errorMessage = 'O nome do formulário não pode ser em branco!'
      return true
    }

    if (this.newForm.name.length > 50) {
      this.errorMessage = 'O nome do formulário tem limite de 50 caracteres!'
      return true
    }

    for (let question of this.newForm.questions) {
      if (!question.content.trim()) {
        this.errorMessage = 'Nenhuma das perguntas podem ser vazias!'
        return true
      }

      if (question.content.length > 150) {
        this.errorMessage = 'As perguntas tem limite de 150 caracteres!'
        return true
      }
    };

    return false;
  }

  CreateForm(): void {
    if (this.AreAnyEmptyInputs()) {
      this.invalidInputs = true;
      return
    }

    this.newForm.groupId = this.groupId;

    this.formsService.CreateForm(this.newForm).subscribe(() => {
      this.closeModal();
      this.sucessfulMessageModal.openModal();
    });
  }

  ResetVariables(): void {
    this.newForm = { id: 0, groupId: 0, name: '', questions: [] }
    this.invalidInputs = false;
  }
}
