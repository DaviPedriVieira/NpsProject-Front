import { Component, ViewChild } from '@angular/core';
import { GroupsCreateModalComponent } from './modals/groups-create-modal/groups-create-modal.component';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CheckAnswersModalComponent } from 'src/app/shared/check-answers-modal/check-answers-modal.component';
import { firstValueFrom } from 'rxjs';
import { SearchComponentComponent } from 'src/app/shared/search-component/search-component.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(GroupsCreateModalComponent) groupsCreateModal!: GroupsCreateModalComponent;
  @ViewChild(CheckAnswersModalComponent) checkAnswersModal!: CheckAnswersModalComponent;
  @ViewChild(SearchComponentComponent) SearchComponent!: SearchComponentComponent;
  groups: FormsGroupModel[] = [];
  search: string = ''
  protected authorized!: boolean;

  constructor(private formsGroupService: FormsGroupService, private loginService: LoginService) { }

  async ngOnInit(): Promise<void> {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    });

    await this.loadFormsGroups();

    this.formsGroupService.formsGroups$.subscribe(data => {
      this.groups = data
      this.filterGroups(this.search)
    })
  }

  async loadFormsGroups(): Promise<void> {
    const data = await firstValueFrom(this.formsGroupService.GetFormsGroups())
    this.groups = data
  }

  filterGroups(search: string): void {
    if (search) {
      this.search = search
      this.groups = this.groups.filter(group =>
        group.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    }
    else {
      this.formsGroupService.formsGroups$.subscribe(data => this.groups = data)
    }
  }

  openCheckAnswersModal(): void {
    this.checkAnswersModal.openModal();
  }

  openGroupsCreateModal(): void {
    this.groupsCreateModal.openModal();
  }
}

