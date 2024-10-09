import { Component, ViewChild } from '@angular/core';
import { FormsModalComponent } from './modals/forms-modal/forms-modal.component';
import { GroupsCreateModalComponent } from './modals/groups-create-modal/groups-create-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CheckAnswersModalComponent } from 'src/app/shared/check-answers-modal/check-answers-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  formsGroups: FormsGroupModel[] = [];
  filteredGroups: FormsGroupModel[] = [];
  authorized!: boolean;

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
      this.filteredGroups = this.formsGroups
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

