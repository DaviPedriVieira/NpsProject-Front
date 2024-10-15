import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { GroupsCreateModalComponent } from 'src/app/pages/home/modals/groups-create-modal/groups-create-modal.component';
import { LoginService } from 'src/app/services/login-service/login.service';
import { FormsCreateModalComponent } from '../forms-create-modal/forms-create-modal.component';
import { QuestionsCreateModalComponent } from '../questions-create-modal/questions-create-modal.component';
import { CheckAnswersModalComponent } from '../check-answers-modal/check-answers-modal.component';
import { FormsGroupModel } from 'src/app/interfaces/forms-group';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionModel } from 'src/app/interfaces/question';
import { FormsGroupService } from 'src/app/services/group-service/formsgroup.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { QuestionService } from 'src/app/services/question-service/question.service';

@Component({
  selector: 'app-items-container-header',
  templateUrl: './items-container-header.component.html',
  styleUrls: ['./items-container-header.component.scss']
})
export class ItemsContainerHeaderComponent implements OnInit {
  @ViewChild(GroupsCreateModalComponent) GroupsCreateModal!: GroupsCreateModalComponent
  @ViewChild(FormsCreateModalComponent) FormsCreateModal!: FormsCreateModalComponent
  @ViewChild(QuestionsCreateModalComponent) QuestionsCreateModal!: QuestionsCreateModalComponent
  @ViewChild(CheckAnswersModalComponent) CheckAnswersModal!: CheckAnswersModalComponent
  @Input() itemType!: string
  @Input() title: string = ''
  @Output() itemSearched = new EventEmitter<string>();
  items: (FormsGroupModel | FormModel | QuestionModel)[] = []
  searched = new Subject<string>()
  authorized: boolean = false

  constructor(private loginService: LoginService, private groupsService: FormsGroupService, private formsService: FormService, private questionService: QuestionService) {
    this.searched.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.itemSearched.emit(value)
    })
  }

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
    })

    switch(this.itemType) {
      case 'group':
        this.groupsService.formsGroups$.subscribe(data => this.items = data)
        break
        case 'form':
        this.formsService.forms$.subscribe(data => this.items = data)
        break
        case 'question':
        this.questionService.questions$.subscribe(data => this.items = data)
        break
    }
  }

  OnInputChange(changed: Event): void {
    const input = changed.target as HTMLInputElement
    this.searched.next(input.value.trim())
  }

  openGroupsCreateModal(): void {
    this.GroupsCreateModal.openModal()
  }

  openFormsCreateModal(): void {
    this.FormsCreateModal.openModal()
  }

  openQuestionsCreateModal(): void {
    this.QuestionsCreateModal.openModal()
  }

  openCheckAnswersModal(): void {
    this.CheckAnswersModal.openModal()
  }
}
