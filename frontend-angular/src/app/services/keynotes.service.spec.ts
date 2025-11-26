import { TestBed } from '@angular/core/testing';

import { KeynotesService } from './keynotes.service';

describe('KeynotesService', () => {
  let service: KeynotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeynotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
