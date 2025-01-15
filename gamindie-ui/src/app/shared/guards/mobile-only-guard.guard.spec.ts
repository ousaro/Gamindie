import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mobileOnlyGuardGuard } from './mobile-only-guard.guard';

describe('mobileOnlyGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mobileOnlyGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
