import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupsCreateModalComponent } from './modals/groups-create-modal/groups-create-modal.component';
import { FormsCreateModalComponent } from './modals/forms-create-modal/forms-create-modal.component';
import { QuestionsCreateModalComponent } from './modals/questions-create-modal/questions-create-modal.component';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { GroupNotificationService } from 'src/app/services/group-notification-service/group-notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  @ViewChild(FormsCreateModalComponent) formsCreateModal!: FormsCreateModalComponent;
  @ViewChild(QuestionsCreateModalComponent) questionsCreateModal!: QuestionsCreateModalComponent;
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModal!: SucessfulMessageModalComponent
  message: string = ''

  constructor(private groupNotificationService: GroupNotificationService) {}

  ngOnInit(): void {
    this.groupNotificationService.groupCreated$.subscribe(() => {
      this.sucessfulMessageModal.openModal('Criado com sucesso!')
    })
  }

  openGroupsCreateModal() {
    setTimeout(() => {
      this.groupsCreateModal.openModal();
    });
  }

  openFormsCreateModal() {
    setTimeout(() => {
      this.formsCreateModal.openModal();
    });
  }

  openQuestionsCreateModal() {
    setTimeout(() => {
      this.questionsCreateModal.openModal();
    });
  }
}
