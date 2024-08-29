import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NpsService } from 'src/app/services/nps-service/nps.service';

@Component({
  selector: 'app-nps-chart',
  templateUrl: './nps-chart.component.html',
  styleUrls: ['./nps-chart.component.scss']
})
export class NpsChartComponent implements OnInit{
  @ViewChild('npsCircle') graphicBorder!: ElementRef<HTMLDivElement>;
  @ViewChild('pointer') pointer!: ElementRef<HTMLDivElement>;
  npsScore: number = 0;

  constructor(private npsService: NpsService) {}

  ngOnInit(): void {
    this.npsService.GetNpsScore().subscribe(data => {
      this.npsScore = data;
      this.SetPointerPosition()
    })
  }

  SetPointerPosition(){
    const angle = ((this.npsScore + 100) / 200) * 360
    this.pointer.nativeElement.style.transform = `rotate(${angle}deg)`
  }
}
