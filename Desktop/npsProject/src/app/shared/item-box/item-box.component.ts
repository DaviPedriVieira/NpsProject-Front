import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { FormsModalComponent } from 'src/app/pages/home/modals/forms-modal/forms-modal.component';
import { QuestionsModalComponent } from '../questions-modal/questions-modal.component';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss']
})
export class ItemBoxComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsModalComponent!: FormsModalComponent;
  @ViewChild(QuestionsModalComponent) questionsModalComponent!: QuestionsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @Input() itemId!: number
  @Input() itemName!: string
  @Input() itemType!: string
  authorized!: boolean

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    })
  }

  openItemModal() {
    switch (this.itemType) {
      case 'group':
        this.openFormsModal()
        break
      case 'form':
        this.openQuestionsModal()
        break
    }
  }

  openFormsModal(): void {
    this.formsModalComponent.groupId = this.itemId
    this.formsModalComponent.groupName = this.itemName
    this.formsModalComponent.openModal();
  }

  openQuestionsModal(): void {
    this.questionsModalComponent.formId = this.itemId;
    this.questionsModalComponent.formName = this.itemName
    this.questionsModalComponent.openModal();
  }

  openDeleteModal(): void {
    this.deleteModalComponent.id = this.itemId
    this.deleteModalComponent.item = this.itemType
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(): void {
    this.updateModalComponent.id = this.itemId
    this.updateModalComponent.name = this.itemName
    this.updateModalComponent.item = this.itemType
    this.updateModalComponent.openModal();
  }
}
