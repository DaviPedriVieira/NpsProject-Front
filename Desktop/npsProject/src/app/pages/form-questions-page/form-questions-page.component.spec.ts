import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionsPageComponent } from './form-questions-page.component';

describe('FormsPageComponent', () => {
  let component: FormQuestionsPageComponent;
  let fixture: ComponentFixture<FormQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQuestionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
