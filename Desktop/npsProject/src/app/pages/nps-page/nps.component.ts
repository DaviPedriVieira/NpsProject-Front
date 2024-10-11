import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NpsService } from 'src/app/services/nps-service/nps.service';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss']
})
export class NpsComponent implements OnInit {
  @ViewChild('pointer') pointer!: ElementRef<HTMLImageElement>;
  npsScore: number = 0;
  authorized: boolean = false

  constructor(private loginService: LoginService, private router: Router, private CookieService: CookieService, private npsService: NpsService) { }

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe({
      next: data => {
        this.authorized = data
        if (data) {
          this.GetNps()
        } else[
          localStorage.setItem('LastRoute', '/home'),
          this.router.navigate(['/home'])
        ]
      },
      error: error => {
        if (error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    })
  }

  GetNps() {
    this.npsService.GetNpsScore().subscribe({
      next: (data) => {
        this.npsScore = data;
        this.SetPointerPosition()
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.CookieService.notifyCookieExpired()
      }
    });
  }

  SetPointerPosition(): void {
    let angle = (this.npsScore + 100) * 0.9
    this.pointer.nativeElement.style.transform = `rotate(${angle + 135}deg)`
  }
}
