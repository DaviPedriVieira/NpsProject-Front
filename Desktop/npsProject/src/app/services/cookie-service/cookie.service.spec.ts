import { TestBed } from '@angular/core/testing';

import { GroupNotificationService } from './group-notification.service';

describe('GroupNotificationService', () => {
  let service: GroupNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
