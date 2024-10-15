import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsContainerHeaderComponent } from './items-container-header.component';

describe('ItemsContainerHeaderComponent', () => {
  let component: ItemsContainerHeaderComponent;
  let fixture: ComponentFixture<ItemsContainerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsContainerHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsContainerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
