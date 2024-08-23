import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private groupCreatedSource = new Subject<void>();
  private closeModalsSource = new Subject<void>();

  groupCreated$ = this.groupCreatedSource.asObservable();
  closeModals$ = this.closeModalsSource.asObservable();

  notifyItemCreated() {
    this.groupCreatedSource.next()
  }

  notifyAnswersSubmited() {
    this.closeModalsSource.next()
  }
}
