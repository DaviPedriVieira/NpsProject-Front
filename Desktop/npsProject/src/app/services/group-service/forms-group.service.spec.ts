import { TestBed } from '@angular/core/testing';

import { FormsGroupService } from './formsgroup.service';

describe('FormsGroupService', () => {
  let service: FormsGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
