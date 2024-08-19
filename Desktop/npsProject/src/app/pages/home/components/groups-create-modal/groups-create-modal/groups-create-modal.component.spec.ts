import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsCreateModalComponent } from './groups-create-modal.component';

describe('GroupsCreateModalComponent', () => {
  let component: GroupsCreateModalComponent;
  let fixture: ComponentFixture<GroupsCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
