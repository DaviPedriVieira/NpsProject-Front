import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sucessful-message-modal',
  templateUrl: './sucessful-message-modal.component.html',
  styleUrls: ['./sucessful-message-modal.component.scss']
})
export class SucessfulMessageModalComponent {
  @ViewChild('sucessfullMessageModal') sucessfulMessageModal!: ElementRef<HTMLDialogElement>
  @Input() message!: string;

  openModal() {
    this.sucessfulMessageModal.nativeElement.showModal();
  }

  closeModal() {
    this.sucessfulMessageModal.nativeElement.close();
  }
}
