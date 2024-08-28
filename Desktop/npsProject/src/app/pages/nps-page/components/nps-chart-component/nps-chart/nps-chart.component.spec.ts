import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsChartComponent } from './nps-chart.component';

describe('NpsChartComponent', () => {
  let component: NpsChartComponent;
  let fixture: ComponentFixture<NpsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
