import { Component, ViewChild } from '@angular/core';
import { GroupsCreateModalComponent } from '../response-component/modals/groups-create-modal/groups-create-modal.component';
import { FormsCreateModalComponent } from '../response-component/modals/forms-create-modal/forms-create-modal.component';
import { QuestionsCreateModalComponent } from '../response-component/modals/questions-create-modal/questions-create-modal.component';
import { CheckAnswersModalComponent } from '../response-component/modals/check-answers-modal/check-answers-modal.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  @ViewChild(FormsCreateModalComponent) formsCreateModal!: FormsCreateModalComponent;
  @ViewChild(QuestionsCreateModalComponent) questionsCreateModal!: QuestionsCreateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModalComponent!: CheckAnswersModalComponent;

  openGroupsCreateModal() {
    this.groupsCreateModal.openModal();
  }

  openFormsCreateModal() {
    this.formsCreateModal.openModal();
  }

  openQuestionsCreateModal() {
    this.questionsCreateModal.openModal();
  }

  openCheckAnswersCreateModal() {
    this.checkAnswersModalComponent.openModal();
  }
}
