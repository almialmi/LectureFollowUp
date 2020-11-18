import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileCheckerComponent } from './update-profile-checker.component';

describe('UpdateProfileCheckerComponent', () => {
  let component: UpdateProfileCheckerComponent;
  let fixture: ComponentFixture<UpdateProfileCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
