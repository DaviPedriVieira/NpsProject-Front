import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @Input() authorized!: boolean;
  formsGroups: FormsGroupModel[] = [];
  groupId: number = 0;

  constructor(private formsGroupService: FormsGroupService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadFormsGroups();

    this.notificationService.groupCreated$.subscribe(() => {
      this.loadFormsGroups();
    })
  }

  loadFormsGroups() {
    this.formsGroupService.GetFormsGroups().subscribe((data) => {
      this.formsGroups = data;
    });
  }

  openFormsModal(id: number) {
    this.groupId = id
    setTimeout(() => {
      this.formsModalComponent.openModal();
    })
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
