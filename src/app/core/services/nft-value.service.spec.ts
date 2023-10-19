import { TestBed } from '@angular/core/testing';

import { NftValueService } from './nft-value.service';

describe('NftValueService', () => {
  let service: NftValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
