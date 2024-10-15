import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent {
  @ViewChild('updatemodal') updatemodal!: ElementRef<HTMLDialogElement>
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>
  @Input() id!: number;
  @Input() name!: string
  @Input() item!: string;
  invalidInput: boolean = false;

  constructor(
    private formsGroupService: FormsGroupService,
    private formsService: FormService,
    private questionService: QuestionService,
  ) { }

  openModal(): void {
    this.updatemodal.nativeElement.showModal();
    setTimeout(() => {
      this.nameInput.nativeElement.focus()
      this.nameInput.nativeElement.select()
    })
  }

  closeModal(): void {
    this.invalidInput = false
    this.updatemodal.nativeElement.close();
  }

  UpdateItem(): void {
    if (!this.NameValidator(this.item)) {
      this.invalidInput = true
    }

    switch (this.item) {
      case 'group':
        this.UpdateGroup()
        break
      case 'form':
        this.UpdateForm()
        break
      case 'question':
        this.UpdateQuestion()
        break
    }
  }

  UpdateGroup(): void {
    this.formsGroupService.UpdateFormsGroup(this.id, this.name).subscribe(() => {
      this.closeModal()
      this.name = '';
    });
  }

  UpdateForm(): void {
    this.formsService.UpdateForm(this.id, this.name).subscribe(() => {
      this.closeModal()
      this.name = '';
    });
  }

  UpdateQuestion(): void {
    this.questionService.UpdateQuestion(this.id, this.name).subscribe(() => {
      this.closeModal()
      this.name = '';
    });
  }

  NameValidator(item: string): boolean {
    if (this.name.trim() == '') {
      return false
    }

    if (item == 'question' && this.name.length > 150)
      return false
    else if (this.name.length > 50)
      return false

    return true;
  }
}
