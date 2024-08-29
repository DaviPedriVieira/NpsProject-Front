import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})  
export class ResponseComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModalComponent!: SucessfulMessageModalComponent;
  @Input() authorized!: boolean;
  formsGroups: FormsGroupModel[] = [];
  groupId: number = 0;

  constructor(private formsGroupService: FormsGroupService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadFormsGroups();

    this.notificationService.groupCreated$.subscribe(() => {
      this.loadFormsGroups();
    })

    this.notificationService.answersSubmited$.subscribe(() => {
      setTimeout(() => {
        this.sucessfulMessageModalComponent.openModal('Respostas enviadas!');
      });
    })
  }

  loadFormsGroups() {
    this.formsGroupService.GetFormsGroups().subscribe((data) => {
      this.formsGroups = data;
    });
  }

  openFormsModal(id: number) {
    this.groupId = id
    console.log(this.groupId)
    setTimeout(() => {
      this.formsModalComponent.openModal();
    });
  }
  
  openDeleteModal(id: number) {
    this.groupId = id
    setTimeout(() => {
      this.deleteModalComponent.openModal();
    });
  }
  
  openUpdateModal(id: number) {
    this.groupId = id
    setTimeout(() => {
      this.updateModalComponent.openModal();
    });
  }
}
