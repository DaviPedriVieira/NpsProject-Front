import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { LoginService } from 'src/app/services/login-service/login.service';
import { GroupNotificationService } from 'src/app/services/group-notification-service/group-notification.service';
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
  formsGroups: FormsGroupModel[] = [];
  authorized!: boolean;
  groupId: number = 0;

  constructor(private formsGroupService: FormsGroupService, private loginService: LoginService, private groupNotificationService: GroupNotificationService) { }

  ngOnInit(): void {
    const username = localStorage.getItem('Username');
    
    if (username == null) {
      this.authorized == false;
      return
    }
    
    this.loginService.isAuthorized(username).subscribe((response: boolean) => {
      this.authorized = response;
      this.loadFormsGroups();
    });

    this.groupNotificationService.groupCreated$.subscribe(() => {
      this.loadFormsGroups();
    })

    this.groupNotificationService.closeModals$.subscribe(() => {
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
