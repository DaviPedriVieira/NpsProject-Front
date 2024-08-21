import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupNotificationService {
  private groupCreatedSource = new Subject<void>();

  groupCreated$ = this.groupCreatedSource.asObservable();

  notifyGroupsCreated() {
    this.groupCreatedSource.next()
  }
}
