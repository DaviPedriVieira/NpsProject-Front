import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @ViewChild('deletemodal') deletemodal!: ElementRef<HTMLDialogElement>
  @Input() itemId!: number;
  @Input() itemType!: string;
  @Output() itemDeleted = new EventEmitter<void>()

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService) { }

  openModal() {
    this.deletemodal.nativeElement.showModal();
  }

  closeModal() {
    this.deletemodal.nativeElement.close();
  }

  delete() {
    if (this.itemType == 'group') {
      this.formsGroupService.DeleteFormsGroup(this.itemId).subscribe(() => {
        this.closeModal()
        this.itemDeleted.emit()
      })
    }
    else if (this.itemType == 'form') {
      this.formsService.DeleteForm(this.itemId).subscribe(() => {
        this.closeModal()
        this.itemDeleted.emit()
      })
    }
  }

}
