import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsUsersComponent } from './nps-users.component';

describe('NpsUsersComponent', () => {
  let component: NpsUsersComponent;
  let fixture: ComponentFixture<NpsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpsUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
