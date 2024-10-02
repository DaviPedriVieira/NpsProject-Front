import { TestBed } from '@angular/core/testing';

import { AuthorizeGuardGuard } from './authorize-guard.guard';

describe('AuthorizeGuardGuard', () => {
  let guard: AuthorizeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
