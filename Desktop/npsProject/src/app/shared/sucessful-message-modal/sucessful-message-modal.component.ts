import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucessful-message-modal',
  templateUrl: './sucessful-message-modal.component.html',
  styleUrls: ['./sucessful-message-modal.component.scss']
})
export class SucessfulMessageModalComponent {
  @ViewChild('sucessfullMessageModal') sucessfulMessageModal!: ElementRef<HTMLDialogElement>
  @Input() message!: string;
  @Input() navigateToHome!: boolean;

  constructor(private router: Router) {}

  openModal(): void {
    this.sucessfulMessageModal.nativeElement.showModal();
  }

  closeModal(): void {
    this.sucessfulMessageModal.nativeElement.close();
    
    if(this.navigateToHome){
      localStorage.setItem('LastRoute', '/home')
      this.router.navigate(['/home'])
    }
  }
}
