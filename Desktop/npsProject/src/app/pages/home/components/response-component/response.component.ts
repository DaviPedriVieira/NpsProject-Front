import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from '../forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  formsGroups: FormsGroupModel[] = [];
  showFormsModal: boolean = false;
  showDeleteModal: boolean = false;
  showUpdateModal: boolean = false;
  authorized!: boolean;
  groupId: number = 0;

  constructor(private formsGroupService: FormsGroupService, private loginService: LoginService) { }

  ngOnInit(): void {
    const username = localStorage.getItem('Username');

    if (username == null) {
      this.authorized == false;
      return
    }
    
    this.loginService.isAuthorized(username).subscribe((response: boolean) => {
      this.authorized = response;
    });

    this.loadFormsGroups();
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

  openModal(event: MouseEvent, whichModal: string) {
    this.GetGroupId(event);

    switch (whichModal) {
      case 'formsModal':
        this.showFormsModal = true
        setTimeout(() => {
          this.formsModalComponent.openModal();
        });
        break

      case 'deleteModal':
        this.showDeleteModal = true
        setTimeout(() => {
          this.deleteModalComponent.openModal();
        });
        break

      case 'updateModal':
        this.showUpdateModal = true
        setTimeout(() => {
          this.updateModalComponent.openModal();
        });
        break
    }
  }
}
