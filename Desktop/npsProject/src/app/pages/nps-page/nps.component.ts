import { Component, ElementRef, ViewChild } from '@angular/core';
import { NpsService } from 'src/app/services/nps-service/nps.service';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss']
})
export class NpsComponent {
  @ViewChild('graphicBorderDiv') graphicBorder!: ElementRef<HTMLDivElement>;
  npsScore: number = 0;

  constructor(private npsService: NpsService) {}

  ngOnInit(): void {
    this.npsService.GetNpsScore().subscribe(data => {
      this.npsScore = data;
      this.ChangeColorAccordingNpsScore()
    })
  }
  
  ChangeColorAccordingNpsScore() {
    if(this.npsScore >= 50){
      this.graphicBorder.nativeElement.style.backgroundColor = 'rgb(36, 151, 32)';
    }
    else if(this.npsScore >= 0){
      this.graphicBorder.nativeElement.style.backgroundColor = 'rgb(63, 74, 173)';
    } 
    else {
      this.graphicBorder.nativeElement.style.backgroundColor = 'rgb(209, 35, 35)';
    }
  }
}
