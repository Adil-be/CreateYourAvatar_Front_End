import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNftComponent } from './add-nft.component';

describe('AddNftComponent', () => {
  let component: AddNftComponent;
  let fixture: ComponentFixture<AddNftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNftComponent]
    });
    fixture = TestBed.createComponent(AddNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
