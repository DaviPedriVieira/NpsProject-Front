import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessfulMessageModalComponent } from './sucessful-message-modal.component';

describe('SucessfulMessageModalComponent', () => {
  let component: SucessfulMessageModalComponent;
  let fixture: ComponentFixture<SucessfulMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessfulMessageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessfulMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
