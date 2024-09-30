import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  authorized!: boolean;
  formsGroups: FormsGroupModel[] = [];
  filteredGroups: FormsGroupModel[] = [];
  groupId: number = 0;
  groupName: string = '';

  constructor(private formsGroupService: FormsGroupService, private notificationService: NotificationService, private loginService: LoginService) { }
  
  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });
    
    this.loadFormsGroups();
    
    this.notificationService.groupCreated$.subscribe(() => {
      this.loadFormsGroups();
    })
  }
  
  loadFormsGroups(): void {
    this.formsGroupService.GetFormsGroups().subscribe({
      next: (data) => {
        this.formsGroups = data;
        this.filteredGroups = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  filterGroups() {

  }

  openFormsModal(id: number, groupName: string): void {
    this.groupId = id
    this.groupName = groupName
    setTimeout(() => {
      this.formsModalComponent.openModal();
    })
  }

  openDeleteModal(id: number): void {
    this.groupId = id
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number, groupName: string): void {
    this.groupId = id
    this.groupName = groupName
    this.updateModalComponent.openModal();
  }
}
