import { TestBed } from '@angular/core/testing';

import { BookbankService } from './bookbank.service';

describe('BookbankService', () => {
  let service: BookbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
