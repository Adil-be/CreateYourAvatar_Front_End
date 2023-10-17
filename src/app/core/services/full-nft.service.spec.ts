import { TestBed } from '@angular/core/testing';

import { FullNftService } from './full-nft.service';

describe('FullNftService', () => {
  let service: FullNftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullNftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
