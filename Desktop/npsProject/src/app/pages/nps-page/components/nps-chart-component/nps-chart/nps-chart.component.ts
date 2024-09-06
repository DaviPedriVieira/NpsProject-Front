import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { NpsService } from 'src/app/services/nps-service/nps.service';

@Component({
  selector: 'app-nps-chart',
  templateUrl: './nps-chart.component.html',
  styleUrls: ['./nps-chart.component.scss']
})
export class NpsChartComponent implements OnInit {
  @ViewChild('pointer') pointer!: ElementRef<HTMLImageElement>;
  npsScore: number = 0;

  constructor(private npsService: NpsService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.npsService.GetNpsScore().subscribe({
      next: (data) => {
        this.npsScore = data;
        this.SetPointerPosition()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.notificationService.notifyCookieExpired()
      }
    });
  }

  SetPointerPosition() {
    let angle = (this.npsScore + 100) * 0.9
    this.pointer.nativeElement.style.transform = `rotate(${angle + 135}deg)`
  }
}
