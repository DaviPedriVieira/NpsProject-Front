import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';

@Component({
  selector: 'app-groups-create-modal',
  templateUrl: './groups-create-modal.component.html',
  styleUrls: ['./groups-create-modal.component.scss']
})
export class GroupsCreateModalComponent {
  @ViewChild('createGroupsModal') formsmodal!: ElementRef<HTMLDialogElement>
  newGroup: FormsGroupModel = {id: 0, name: '', forms: []};
  forms: FormModel[] = [];

  openModal() {
    this.formsmodal.nativeElement.showModal();
  }

  closeModal() {
    this.formsmodal.nativeElement.close();
  }
}
