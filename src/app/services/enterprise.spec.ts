import { TestBed } from '@angular/core/testing';
import { Enterprise } from './enterprise';

describe('Enterprise', () => {
  let service: Enterprise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Enterprise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
