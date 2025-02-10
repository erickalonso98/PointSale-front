import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { identityGuard } from './identity.guard';

describe('identityGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => identityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
