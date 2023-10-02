import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGaleryComponent } from './user-galery.component';

describe('UserGaleryComponent', () => {
  let component: UserGaleryComponent;
  let fixture: ComponentFixture<UserGaleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGaleryComponent]
    });
    fixture = TestBed.createComponent(UserGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
