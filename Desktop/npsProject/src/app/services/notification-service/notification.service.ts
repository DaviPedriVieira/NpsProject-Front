import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private groupCreatedSource = new Subject<void>();
  private answersSubmitedSource = new Subject<void>();

  groupCreated$ = this.groupCreatedSource.asObservable();
  answersSubmited$ = this.answersSubmitedSource.asObservable();

  notifyItemCreated() {
    this.groupCreatedSource.next()
  }

  notifyAnswersSubmited() {
    this.answersSubmitedSource.next()
  }
}
