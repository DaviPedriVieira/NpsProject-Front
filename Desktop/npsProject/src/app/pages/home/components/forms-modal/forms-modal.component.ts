import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormModel } from 'src/app/interfaces/form';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';

@Component({
  selector: 'app-forms-modal',
  templateUrl: './forms-modal.component.html',
  styleUrls: ['./forms-modal.component.scss']
})
export class FormsModalComponent {
  @ViewChild('formsmodal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @Input() groupId!: number;
  forms: FormModel[] = [];
  showDeleteModal: boolean = false;
  showUpdateModal: boolean = false;

  constructor(private formService: FormService) { }

  GetFormId(event: MouseEvent) {
    const clickedOption = event.target as HTMLElement
    const formDiv = clickedOption.closest('.forms-div');
    if(formDiv){
      const groupIdDiv = formDiv.querySelector('#formId-div');

      if(groupIdDiv) 
        this.groupId = Number(groupIdDiv.textContent);
      else
        this.groupId = 0;
    }
  }

  openModal() {
    this.formsmodal.nativeElement.showModal();

    this.loadForms()
  }

  loadForms() {
    this.formService.GetFormsByGroupId(this.groupId).subscribe(data => {
      this.forms = data;
    })
  }

  closeModal() {
    this.formsmodal.nativeElement.close();
  }

  openDeleteModal(event: MouseEvent) {
    this.GetFormId(event);

    this.showDeleteModal = true
    setTimeout(() => {
      this.deleteModalComponent.openModal();
    });
  }

  openUpdateModal(event: MouseEvent) {
    this.GetFormId(event);

    this.showUpdateModal = true
    setTimeout(() => {
      this.updateModalComponent.openModal();
    });
  }
}
