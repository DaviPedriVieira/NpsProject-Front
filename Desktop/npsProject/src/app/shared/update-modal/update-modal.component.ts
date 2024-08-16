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
  @Input() itemId!: number;
  @Input() itemType!: string;
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

  update() {
    if (this.itemType == 'group' && this.NewNameValidator()) {
      this.formsGroupService.UpdateFormsGroup(this.itemId, this.newName).subscribe(() => {
        this.closeModal()
        this.itemUpdated.emit()
        this.newName = '';
      })
    }
    else if (this.itemType == 'form' && this.NewNameValidator()) {
      this.formsService.UpdateForm(this.itemId, this.newName).subscribe(() => {
        this.closeModal()
        this.itemUpdated.emit()
        this.newName = '';
      })
    }
    else if (this.itemType == 'question' && this.NewNameValidator()) {
      this.questionService.UpdateQuestion(this.itemId, this.newName).subscribe(() => {
        this.closeModal()
        this.itemUpdated.emit()
        this.newName = '';
      })
    }
  }

  NewNameValidator(): boolean {
    if(this.newName.trim() == ''){
      this.invalidInput = true
      return false
    } 
    
    return true;
  }
}
