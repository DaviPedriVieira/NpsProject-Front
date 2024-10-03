import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Output() formCreated = new EventEmitter()
  @Input() groupId!: number;
  newForm: FormModel = { id: 0, groupId: 0, name: '', questions: [] }
  invalidInputs: boolean = false;
  selectedGroupId!: number;
  groups: FormsGroupModel[] = [];
  errorMessage: string = ''

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService, private notificationService: NotificationService) { }

  openModal() {
    this.selectedGroupId = this.groupId
    this.createFormsModal.nativeElement.show();
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
    if (this.selectedGroupId == undefined) {
      this.errorMessage =  'O grupo não pode ser vazio'
      return true
    }

    if (!this.newForm.name.trim()) {
      this.errorMessage = 'O nome do formulário não pode ser em branco!'
      return true
    }

    if (this.newForm.name.length > 50){
      this.errorMessage = 'O nome do formulário tem limite de 50 caracteres!'
      return true
    }

    for (let question of this.newForm.questions) {
      if (!question.content.trim()){
        this.errorMessage = 'Nenhuma das perguntas podem ser vazias!'
        return true
      }

      if (question.content.length > 150){
        this.errorMessage = 'As perguntas tem limite de 150 caracteres!'
        return true
      }
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
        this.formCreated.emit()
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
