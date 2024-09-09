import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
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

  constructor(private formsGroupService: FormsGroupService, private formsService: FormService, private questionService: QuestionService, private notificationService: NotificationService) { }

  openModal(): void {
    this.deletemodal.nativeElement.show();
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
    this.formsGroupService.DeleteFormsGroup(this.id).subscribe({
      next: () => {
        this.closeModal()
        this.itemDeleted.emit()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  DeleteForm(): void {
    this.formsService.DeleteForm(this.id).subscribe({
      next: () => {
        this.closeModal()
        this.itemDeleted.emit()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  DeleteQuestion(): void {
    this.questionService.DeleteQuestion(this.id).subscribe({
      next: () => {
        this.closeModal()
        this.itemDeleted.emit()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }
}
