import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { FormsModalComponent } from 'src/app/pages/home/modals/forms-modal/forms-modal.component';
import { QuestionsModalComponent } from '../questions-modal/questions-modal.component';
import { LoginService } from 'src/app/services/login-service/login.service';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionModel } from 'src/app/interfaces/question';

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
  @Input() itemName!: string
  @Input() itemId!: number
  @Input() itemType!: string
  @Input() items!: (FormsGroupModel | FormModel | QuestionModel)[]
  // @Output() listChanged = new EventEmitter<void>()
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
    setTimeout(() => {
      this.formsModalComponent.openModal();
    })
  }

  openQuestionsModal(): void {
    this.questionsModalComponent.formId = this.itemId;
    this.questionsModalComponent.formName = this.itemName
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }

  openDeleteModal(): void {
    this.deleteModalComponent.id = this.itemId
    this.deleteModalComponent.item = this.itemType
    this.deleteModalComponent.openModal();

    this.deleteModalComponent.itemDeleted.subscribe(() => {
      const index = this.items.findIndex(item => item.id === this.itemId);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    });
  }

  openUpdateModal(): void {
    this.updateModalComponent.id = this.itemId
    this.updateModalComponent.name = this.itemName
    this.updateModalComponent.item = this.itemType
    this.updateModalComponent.openModal();

    this.updateModalComponent.itemUpdated.subscribe((newName: string) => {
      const foundItem = this.items.find(item => item.id === this.itemId);
      if (foundItem) {
        if ('name' in foundItem) { 
          foundItem.name = newName;
        } else if ('content' in foundItem) { 
          foundItem.content = newName; 
        }
      }
    });
  }


}
