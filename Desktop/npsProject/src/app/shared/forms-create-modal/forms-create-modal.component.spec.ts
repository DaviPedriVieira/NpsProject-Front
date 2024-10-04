import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCreateModalComponent } from '../../pages/home/components/response-component/modals/forms-create-modal/forms-create-modal.component';

describe('FormsCreateModalComponent', () => {
  let component: FormsCreateModalComponent;
  let fixture: ComponentFixture<FormsCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
