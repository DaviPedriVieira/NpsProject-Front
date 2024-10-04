import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login-service/login.service';
import { GroupsCreateModalComponent } from './modals/groups-create-modal/groups-create-modal.component';
import { CheckAnswersModalComponent } from './modals/check-answers-modal/check-answers-modal.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  authorized!: boolean;
  formsGroups: FormsGroupModel[] = [];
  filteredGroups: FormsGroupModel[] = [];
  groupId: number = 0;
  groupName: string = '';

  constructor(private formsGroupService: FormsGroupService, private CookieService: CookieService, private loginService: LoginService) { }
  
  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });
    
    this.loadFormsGroups();
  }
  
  loadFormsGroups(): void {
    this.formsGroupService.GetFormsGroups().subscribe({
      next: (data) => {
        this.formsGroups = data;
        this.filteredGroups = data;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }

  filterGroups(search: string) {
    if(search) {
      this.filteredGroups = this.formsGroups.filter(group => 
        group.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )    
    } 
    else {
      this.filteredGroups = [...this.formsGroups]
    }
  }

  openCheckAnswersModal() {
    this.checkAnswersModal.openModal();
  }

  openGroupsCreateModal() {
    this.groupsCreateModal.openModal();
  }

  openFormsModal(id: number, groupName: string): void {
    this.formsModalComponent.groupId = id
    this.formsModalComponent.groupName = groupName
    setTimeout(() => {
      this.formsModalComponent.openModal();
    })
  }

  openDeleteModal(id: number): void {
    this.deleteModalComponent.id = id
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number, groupName: string): void {
    this.updateModalComponent.id = id
    this.updateModalComponent.name = groupName
    this.updateModalComponent.openModal();
  }
}
