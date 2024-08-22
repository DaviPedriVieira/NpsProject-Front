import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupNotificationService {
  private groupCreatedSource = new Subject<void>();
  private closeModalsSource = new Subject<void>();

  groupCreated$ = this.groupCreatedSource.asObservable();
  closeModals$ = this.closeModalsSource.asObservable();

  notifyGroupsCreated() {
    this.groupCreatedSource.next()
  }

  notifyToCloseModals() {
    this.closeModalsSource.next()
  }
}
