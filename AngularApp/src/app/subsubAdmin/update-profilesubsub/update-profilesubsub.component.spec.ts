import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilesubsubComponent } from './update-profilesubsub.component';

describe('UpdateProfilesubsubComponent', () => {
  let component: UpdateProfilesubsubComponent;
  let fixture: ComponentFixture<UpdateProfilesubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfilesubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilesubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
