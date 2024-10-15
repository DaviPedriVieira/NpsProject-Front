import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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

  constructor(
    private formsGroupService: FormsGroupService,
    private formsService: FormService,
    private questionService: QuestionService,
  ) { }

  openModal(): void {
    this.deletemodal.nativeElement.showModal();
  }

  closeModal(): void {
    this.deletemodal.nativeElement.close();
  }

  DeleteItem(): void {
    switch (this.item) {
      case 'group':
        this.DeleteGroup()
        break
      case 'form':
        this.DeleteForm()
        break
      case 'question':
        this.DeleteQuestion()
        break
    }
  }

  DeleteGroup(): void {
    this.formsGroupService.DeleteFormsGroup(this.id).subscribe(() => {
      this.closeModal()
    });
  }

  DeleteForm(): void {
    this.formsService.DeleteForm(this.id).subscribe(() => {
      this.closeModal()
    });
  }

  DeleteQuestion(): void {
    this.questionService.DeleteQuestion(this.id).subscribe(() => {
      this.closeModal()
    });
  }
}
