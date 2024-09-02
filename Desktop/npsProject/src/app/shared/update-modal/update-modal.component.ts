import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() id!: number;
  @Input() item!: string;
  @Output() itemUpdated = new EventEmitter<void>();
  newName: string = '';
  invalidInput: boolean = false;

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService, private questionService: QuestionService) { }

  openModal() {
    this.updatemodal.nativeElement.showModal();
  }

  closeModal() {
    this.updatemodal.nativeElement.close();
  }

  UpdateItem() {
    if (this.item == 'group' && this.NameValidator()) {
      this.formsGroupService.UpdateFormsGroup(this.id, this.newName).subscribe(() => {
        this.closeModal()
        this.itemUpdated.emit()
        this.newName = '';
      })
    }
    else if (this.item == 'form' && this.NameValidator()) {
      this.formsService.UpdateForm(this.id, this.newName).subscribe(() => {
        this.closeModal()
        this.itemUpdated.emit()
        this.newName = '';
      })
    }
    else if (this.item == 'question' && this.NameValidator()) {
      this.questionService.UpdateQuestion(this.id, this.newName).subscribe(() => {
        this.closeModal()
        this.itemUpdated.emit()
        this.newName = '';
      })
    }
  }

  NameValidator(): boolean {
    if(this.newName.trim() == ''){
      this.invalidInput = true
      return false
    } 
    
    return true;
  }
}
