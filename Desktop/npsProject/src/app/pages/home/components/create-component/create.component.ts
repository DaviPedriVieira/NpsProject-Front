import { Component, ViewChild } from '@angular/core';
import { GroupsCreateModalComponent } from './modals/groups-create-modal/groups-create-modal.component';
import { FormsCreateModalComponent } from './modals/forms-create-modal/forms-create-modal.component';
import { QuestionsCreateModalComponent } from './modals/questions-create-modal/questions-create-modal.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  @ViewChild(FormsCreateModalComponent) formsCreateModal!: FormsCreateModalComponent;
  @ViewChild(QuestionsCreateModalComponent) questionsCreateModal!: QuestionsCreateModalComponent;

  openGroupsCreateModals() {
    setTimeout(() => {
      this.groupsCreateModal.openModal();
    });
  }

  openFormsCreateModals() {
    setTimeout(() => {
      this.formsCreateModal.openModal();
    });
  }

  openQuestionsCreateModals() {
    setTimeout(() => {
      this.questionsCreateModal.openModal();
    });
  }
}
