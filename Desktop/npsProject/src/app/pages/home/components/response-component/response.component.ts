import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { LoginService } from 'src/app/services/login-service/login.service';
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

    this.notificationService.updated$.subscribe(() => {
      this.sucessfulMessageModalComponent.openModal('Editado com sucesso!')
    })

    this.notificationService.closeModals$.subscribe(() => {
      this.formsModalComponent.closeModal()
      this.sucessfulMessageModalComponent.openModal('Respostas enviadas!')
    })
  }

  loadFormsGroups() {
    this.formsGroupService.GetFormsGroups().subscribe((data) => {
      this.formsGroups = data;
    });
  }

  GetGroupId(event: MouseEvent) {
    const clickedOption = event.target as HTMLElement
    const groupDiv = clickedOption.closest('.groups-div');
    if (groupDiv) {
      const groupIdDiv = groupDiv.querySelector('#groupId-div');

      if (groupIdDiv)
        this.groupId = Number(groupIdDiv.textContent);
      else
        this.groupId = 0;
    }
  }

  openFormsModal(event: MouseEvent) {
    this.GetGroupId(event);
    setTimeout(() => {
      this.formsModalComponent.openModal();
    });
  }

  openDeleteModal(event: MouseEvent) {
    this.GetGroupId(event);
    setTimeout(() => {
      this.deleteModalComponent.openModal();
    });
  }

  openUpdateModal(event: MouseEvent) {
    this.GetGroupId(event);
    setTimeout(() => {
      this.updateModalComponent.openModal();
    });
  }

  openSucessfullModal(){
    setTimeout(() => {
      this.sucessfulMessageModalComponent.openModal('Respostas enviadas!');
    });
  }
}
