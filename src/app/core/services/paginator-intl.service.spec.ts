import { TestBed } from '@angular/core/testing';

import { PaginatorIntlService } from './paginator-intl.service';

describe('PaginatorInService', () => {
  let service: PaginatorIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatorIntlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
