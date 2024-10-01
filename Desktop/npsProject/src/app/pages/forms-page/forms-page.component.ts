import { Component, OnInit, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/form';
import { QuestionsModalComponent } from '../home/components/response-component/modals/questions-modal/questions-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})
export class FormsPageComponent implements OnInit{
  @ViewChild(QuestionsModalComponent) questionsModalComponent!: QuestionsModalComponent;
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  formId: number = 0
  formName: string = '' // mudar 
  forms: FormModel[] = []
  filteredForms: FormModel[] = []
  authorized: boolean = false

  constructor(private formsService: FormService) {}

  ngOnInit(): void {
    this.formsService.GetForms().subscribe(data => {
      this.forms = data
      this.filteredForms = data
    })
  }

  filterForms(search: string) {
    if(search) {
      this.filteredForms = this.forms.filter(form => 
        form.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )    
    } 
    else {
      this.filteredForms = [...this.forms]
    }
  }

  openQuestionsModal(id: number, formName: string): void {
    this.formId = id;
    this.formName = formName
    setTimeout(() => {
      this.questionsModalComponent.openModal();
    });
  }

  openDeleteModal(id: number): void {
    this.formId = id;
    this.deleteModalComponent.openModal();
  }

  openUpdateModal(id: number, formName: string): void {
    this.formId = id;
    this.formName = formName
    this.updateModalComponent.openModal();
  }
}
