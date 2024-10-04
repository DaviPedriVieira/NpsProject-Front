import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnswersModalComponent } from './check-answers-modal.component';

describe('CheckAnswersModalComponent', () => {
  let component: CheckAnswersModalComponent;
  let fixture: ComponentFixture<CheckAnswersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAnswersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAnswersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
