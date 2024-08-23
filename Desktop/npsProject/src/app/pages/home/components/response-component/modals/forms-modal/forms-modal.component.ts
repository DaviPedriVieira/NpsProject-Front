import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormModel } from 'src/app/interfaces/form';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from '../questions-modal/questions-modal.component';

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
  @Input() authorized!: boolean;
  forms: FormModel[] = [];
  formId: number = 0

  constructor(private formService: FormService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();
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

  openQuestionsModal(event: MouseEvent) {
    this.GetFormId(event);
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }

  openDeleteModal(event: MouseEvent) {
    this.GetFormId(event);
    setTimeout(() => {
      this.deleteModalComponent.openModal();
    });
  }

  openUpdateModal(event: MouseEvent) {
    this.GetFormId(event);
    setTimeout(() => {
      this.updateModalComponent.openModal();
    });
  }
}
