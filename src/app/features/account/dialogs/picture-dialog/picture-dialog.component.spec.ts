import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDialogComponent } from './picture-dialog.component';

describe('PictureDialogComponent', () => {
  let component: PictureDialogComponent;
  let fixture: ComponentFixture<PictureDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PictureDialogComponent]
    });
    fixture = TestBed.createComponent(PictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
