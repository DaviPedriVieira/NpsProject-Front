import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent {
  @ViewChild('updatemodal') updatemodal!: ElementRef<HTMLDialogElement>
  @Input() groupId!: number;

  constructor(private formService: FormService) { }

  openModal() {
    this.updatemodal.nativeElement.showModal();

    // this.formService.GetFormsByGroupId(this.groupId).subscribe(data => {
    //   this.forms = data;
    // })
  }

  closeModal() {
    this.updatemodal.nativeElement.close();
  }
}
