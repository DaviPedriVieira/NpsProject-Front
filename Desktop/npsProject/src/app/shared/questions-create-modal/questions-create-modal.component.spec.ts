import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCreateModalComponent } from './questions-create-modal.component';

describe('QuestionsCreateModalComponent', () => {
  let component: QuestionsCreateModalComponent;
  let fixture: ComponentFixture<QuestionsCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
