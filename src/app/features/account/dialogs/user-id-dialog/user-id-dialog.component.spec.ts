import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdDialogComponent } from './user-id-dialog.component';

describe('UserIdDialogComponent', () => {
  let component: UserIdDialogComponent;
  let fixture: ComponentFixture<UserIdDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdDialogComponent]
    });
    fixture = TestBed.createComponent(UserIdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
