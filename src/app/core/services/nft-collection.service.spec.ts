import { TestBed } from '@angular/core/testing';

import { NftCollectionService } from './nft-collection.service';

describe('NftCollectionService', () => {
  let service: NftCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
