import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  groupId: number = 0;

  constructor(private formsGroupService: FormsGroupService, private notificationService: NotificationService) { }
  
  ngOnInit(): void {
    this.authorized = localStorage.getItem('Role') == 'Administrador' ? true : false;
    
    this.loadFormsGroups();
    
    this.notificationService.groupCreated$.subscribe(() => {
      this.loadFormsGroups();
    })
  }
  
  loadFormsGroups() {
    this.formsGroupService.GetFormsGroups().subscribe({
      next: (data) => {
        this.formsGroups = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  openFormsModal(id: number) {
    this.groupId = id
    this.formsModalComponent.openModal();
  }

  openDeleteModal(id: number) {
    this.groupId = id
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number) {
    this.groupId = id
    this.updateModalComponent.openModal();
  }
}
