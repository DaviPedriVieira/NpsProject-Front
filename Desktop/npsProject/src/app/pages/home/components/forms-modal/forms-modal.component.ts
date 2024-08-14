import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form/form.service';
import { Form } from '@angular/forms';
import { FormModel } from 'src/app/interfaces/form';

@Component({
  selector: 'app-forms-modal',
  templateUrl: './forms-modal.component.html',
  styleUrls: ['./forms-modal.component.scss']
})
export class FormsModalComponent {
  @ViewChild('formsmodal') formsmodal!: ElementRef<HTMLDialogElement>
  @Input() groupId!: number;
  forms: FormModel[] = [];

  constructor(private formService: FormService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();

    if (this.groupId) {
      this.formService.GetFormsByGroupId(this.groupId).subscribe(data => {
        this.forms = data;
      })
    }
    else{
      console.log('não chegou o group id no formsService')
    }
  }

  closeModal() {
    this.formsmodal.nativeElement.close();
  }

  showOptions() {

  }
}
