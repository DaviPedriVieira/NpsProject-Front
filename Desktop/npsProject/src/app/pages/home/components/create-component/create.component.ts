import { Component, ViewChild } from '@angular/core';
import { GroupsCreateModalComponent } from './modals/groups-create-modal/groups-create-modal.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  showGroupsCreateModal: boolean = false;

  openModals(whichModal: string) {
    switch (whichModal) {
      case 'groupsCreateModal':
        this.showGroupsCreateModal = true
        setTimeout(() => {
          this.groupsCreateModal.openModal();
        });
        break

    }
  }
}
