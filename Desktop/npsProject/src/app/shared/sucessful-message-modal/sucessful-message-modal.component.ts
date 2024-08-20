import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sucessful-message-modal',
  templateUrl: './sucessful-message-modal.component.html',
  styleUrls: ['./sucessful-message-modal.component.scss']
})
export class SucessfulMessageModalComponent {
  @ViewChild('sucessfullMessageModal') sucessfulMessageModal!: ElementRef<HTMLDialogElement>
  @Input() message!: string;
  @Output() sucessfulModalClosed = new EventEmitter<void>();

  openModal() {
    this.sucessfulMessageModal.nativeElement.showModal();
  }

  closeModal() {
    this.sucessfulMessageModal.nativeElement.close();
    this.sucessfulModalClosed.emit()
  }
}
