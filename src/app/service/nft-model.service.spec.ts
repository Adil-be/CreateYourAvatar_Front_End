import { TestBed } from '@angular/core/testing';

import { NftModelService } from './nft-model.service';

describe('NftModelService', () => {
  let service: NftModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
