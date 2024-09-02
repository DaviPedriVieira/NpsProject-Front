import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @ViewChild('deletemodal') deletemodal!: ElementRef<HTMLDialogElement>
  @Input() id!: number;
  @Input() item!: string;
  @Output() itemDeleted = new EventEmitter<void>()

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService, private questionService: QuestionService) { }

  openModal() {
    this.deletemodal.nativeElement.showModal();
  }

  closeModal() {
    this.deletemodal.nativeElement.close();
  }

  delete() {
    if (this.item == 'group') {
      this.formsGroupService.DeleteFormsGroup(this.id).subscribe(() => {
        this.closeModal()
        this.itemDeleted.emit()
      })
    }
    else if (this.item == 'form') {
      this.formsService.DeleteForm(this.id).subscribe(() => {
        this.closeModal()
        this.itemDeleted.emit()
      })
    }
    else if (this.item == 'question') {
      this.questionService.DeleteQuestion(this.id).subscribe(() => {
        this.closeModal()
        this.itemDeleted.emit()
      })
    }
  }

}
