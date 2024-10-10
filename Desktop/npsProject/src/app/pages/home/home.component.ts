import { Component, ViewChild } from '@angular/core';
import { GroupsCreateModalComponent } from './modals/groups-create-modal/groups-create-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CheckAnswersModalComponent } from 'src/app/shared/check-answers-modal/check-answers-modal.component';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  formsGroups: FormsGroupModel[] = [];
  filteredGroups: FormsGroupModel[] = [];
  authorized!: boolean;
  search: string = ''

  constructor(private formsGroupService: FormsGroupService, private CookieService: CookieService, private loginService: LoginService) { }

  async ngOnInit(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    await this.loadFormsGroups();

    this.formsGroupService.formsGroups$.subscribe(data => {
      this.formsGroups = data
      this.filteredGroups = data
      this.filterGroups(this.search)
    })
  }

  async loadFormsGroups(): Promise<void> {
    try {
      const data = await firstValueFrom(this.formsGroupService.GetFormsGroups())
      this.formsGroups = data
      this.filteredGroups = data
    } catch (error) {
      const httpError = error as HttpErrorResponse
      if (httpError.status == 401)
        this.CookieService.notifyCookieExpired()
    }
  }

  filterGroups(search: string) {
    if (search) {
      this.search = search
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
}

