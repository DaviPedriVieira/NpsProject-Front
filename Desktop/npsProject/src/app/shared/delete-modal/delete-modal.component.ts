import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { SucessfulMessageModalComponent } from '../sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @ViewChild(SucessfulMessageModalComponent) SucessfulMessageModal!: SucessfulMessageModalComponent
  @ViewChild('deletemodal') deletemodal!: ElementRef<HTMLDialogElement>
  @Input() id!: number;
  @Input() item!: string;
  @Output() itemDeleted = new EventEmitter<void>()

  constructor(
    private formsGroupService: FormsGroupService,
    private formsService: FormService,
    private questionService: QuestionService,
    private CookieService: CookieService
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
    this.formsGroupService.DeleteFormsGroup(this.id).subscribe({
      next: () => {
        this.closeModal()
        this.SucessfulMessageModal.openModal()
        this.itemDeleted.emit()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }

  DeleteForm(): void {
    this.formsService.DeleteForm(this.id).subscribe({
      next: () => {
        this.closeModal()
        this.SucessfulMessageModal.openModal()
        this.itemDeleted.emit()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }
  
  DeleteQuestion(): void {
    this.questionService.DeleteQuestion(this.id).subscribe({
      next: () => {
        this.closeModal()
        this.SucessfulMessageModal.openModal()
        this.itemDeleted.emit()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }
}
