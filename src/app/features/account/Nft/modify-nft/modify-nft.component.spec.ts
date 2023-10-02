import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNftComponent } from './modify-nft.component';

describe('ModifyNftComponent', () => {
  let component: ModifyNftComponent;
  let fixture: ComponentFixture<ModifyNftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyNftComponent]
    });
    fixture = TestBed.createComponent(ModifyNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
