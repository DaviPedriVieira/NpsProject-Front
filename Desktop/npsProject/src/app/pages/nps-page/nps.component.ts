import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';
import { NpsService } from 'src/app/services/nps-service/nps.service';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss']
})
export class NpsComponent implements OnInit {
  @ViewChild('pointer') pointer!: ElementRef<HTMLImageElement>;
  npsScore: number = 0;
  protected authorized: boolean = false

  constructor(private loginService: LoginService, private router: Router , private npsService: NpsService) { }

  ngOnInit(): void {
    this.loginService.isAdmin().subscribe(data => {
      this.authorized = data
      if (data) {
        this.GetNps()
      } else[
        localStorage.setItem('LastRoute', '/home'),
        this.router.navigate(['/home'])
      ]
    })
  }

  GetNps(): void {
    this.npsService.GetNpsScore().subscribe(data => {
      this.npsScore = data;
      this.SetPointerPosition()
    });
  }

  SetPointerPosition(): void {
    let angle = (this.npsScore + 100) * 0.9
    this.pointer.nativeElement.style.transform = `rotate(${angle + 135}deg)`
  }
}
