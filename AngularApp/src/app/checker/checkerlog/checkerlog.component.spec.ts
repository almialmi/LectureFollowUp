import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerlogComponent } from './checkerlog.component';

describe('CheckerlogComponent', () => {
  let component: CheckerlogComponent;
  let fixture: ComponentFixture<CheckerlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
