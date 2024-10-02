import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
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
  @Input() item!: string;
  @Input() name!: string
  @Output() itemUpdated = new EventEmitter<void>();
  invalidInput: boolean = false;

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService, private questionService: QuestionService, private notificationService: NotificationService) {}

  openModal() {
    this.updatemodal.nativeElement.show();
    setTimeout(() => {
      this.nameInput.nativeElement.focus()
      this.nameInput.nativeElement.select()
    })
  }

  closeModal() {
    this.invalidInput = false
    this.updatemodal.nativeElement.close();
  }

  UpdateItem() {
    if (!this.NameValidator(this.item)){
      this.invalidInput = true
    }
    
    switch(this.item) {
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
    this.formsGroupService.UpdateFormsGroup(this.id, this.name).subscribe({
      next: () => {
        this.closeModal()
        this.itemUpdated.emit()
        this.name = '';
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }
  
  UpdateForm(): void {
    this.formsService.UpdateForm(this.id, this.name).subscribe({
      next: () => {
        this.closeModal()
        this.itemUpdated.emit()
        this.name = '';
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  UpdateQuestion(): void {
    this.questionService.UpdateQuestion(this.id, this.name).subscribe({
      next: () => {
        this.closeModal()
        this.itemUpdated.emit()
        this.name = '';
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  NameValidator(item: string): boolean {
    if (this.name.trim() == '') {
      return false
    }

    if(item == 'question' && this.name.length > 150)
      return false
    else if (this.name.length > 50)
      return false

    return true;
  }
}
