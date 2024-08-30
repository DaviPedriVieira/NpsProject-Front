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

  openQuestionsModal(id: number) {
    this.formId = id;
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }
  
  openDeleteModal(id: number) {
    this.formId = id;
    this.deleteModalComponent.openModal();
  }
  
  openUpdateModal(id: number) {
    this.formId = id;
    this.updateModalComponent.openModal();
  }
}
