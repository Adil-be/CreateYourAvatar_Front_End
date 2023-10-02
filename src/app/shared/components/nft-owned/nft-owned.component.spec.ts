import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftOwnedComponent } from './nft-owned.component';

describe('NftOwnedComponent', () => {
  let component: NftOwnedComponent;
  let fixture: ComponentFixture<NftOwnedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NftOwnedComponent]
    });
    fixture = TestBed.createComponent(NftOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
