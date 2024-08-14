import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsGroupService } from 'src/app/services/group/formsgroup.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormsModalComponent } from '../forms-modal/forms-modal.component';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  formsGroups: FormsGroupModel[] = [];
  showModal: boolean = false;
  groupId: number = 0;

  constructor(private formsGroupService: FormsGroupService) { }

  ngOnInit(): void {
    this.formsGroupService.GetFormsGroups().subscribe((data) => {
      this.formsGroups = data;
    });
  }

  showOptions() {

  }

  openModal() {
    this.showModal = true
    setTimeout(() => {
      this.formsModalComponent.openModal();
    });
  }

  GetGroupId(event: MouseEvent) {
    const clickedGroupElement = event.target as HTMLElement
    const groupNameDiv = clickedGroupElement.querySelector('#groupId-div') as HTMLElement;
    this.groupId = Number(groupNameDiv.textContent);

    this.openModal();
  }
}
