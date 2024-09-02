import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AnswerModel } from 'src/app/interfaces/answer';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { SucessfulMessageModalComponent } from 'src/app/shared/sucessful-message-modal/sucessful-message-modal.component';
import { UpdateModalComponent } from 'src/app/shared/update-modal/update-modal.component';

@Component({
  selector: 'app-questions-modal',
  templateUrl: './questions-modal.component.html',
  styleUrls: ['./questions-modal.component.scss']
})
export class QuestionsModalComponent {
  @ViewChild('questionsmodal') formsmodal!: ElementRef<HTMLDialogElement>
  @ViewChild(DeleteModalComponent) deleteModalComponent!: DeleteModalComponent;
  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;
  @ViewChild(SucessfulMessageModalComponent) sucessfulMessageModalComponent!: SucessfulMessageModalComponent;
  @Input() formId!: number;
  @Input() authorized!: boolean;
  questions: QuestionModel[] = []; 
  selectedGrades: number[] = [];
  descriptions: string[] = [];
  questionId: number = 0
  invalidInputs: boolean = false

  constructor(private questionService: QuestionService, private answersService: AnswerService) { }

  openModal() {
    this.formsmodal.nativeElement.showModal();
    this.loadQuestions()
  }

  closeModal() {
    this.formsmodal.nativeElement.close();
    this.ResetVariables()
  }

  loadQuestions() {
    this.questionService.GetQuestionsByFormId(this.formId).subscribe(data => {
      this.questions = data;
    })
  }

  openUpdateModal(id: number) {
    this.questionId = id
    this.updateModalComponent.openModal();
  }

  openDeleteModal(id: number) {
    this.questionId = id
    this.deleteModalComponent.openModal();
  }

  ValidSelects(): boolean {
    if(this.selectedGrades.length == 0){
      return false;
    }

    for (let i = 0; i < this.selectedGrades.length; i++) {
      if(this.selectedGrades[i] == null){
        return false
      }
    }

    return true
  }

  PopulateAnswers() {
    if(!this.ValidSelects()){
      this.invalidInputs = true;
      return
    }

    const answers: AnswerModel[] = []

    for (let i = 0; i < this.selectedGrades.length; i++) {
      const newAnswer: AnswerModel = {
        id: 0,
        userId: 0,
        grade: this.selectedGrades[i],
        description: this.descriptions[i],
        questionId: this.questions[i].id,
      }
      answers[i] = newAnswer;
    }
    this.SubmitAnswers(answers)
  }

  SubmitAnswers(answers: AnswerModel[]) {
    this.answersService.SubmitAnswers(answers).subscribe(() => {
      this.closeModal()
      this.sucessfulMessageModalComponent.openModal();
    })
  }

  ResetVariables() {
    this.selectedGrades = [];
    this.descriptions = [];
    this.invalidInputs = false;
  }
}
