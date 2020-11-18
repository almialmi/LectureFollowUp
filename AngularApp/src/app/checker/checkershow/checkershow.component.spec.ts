import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckershowComponent } from './checkershow.component';

describe('CheckershowComponent', () => {
  let component: CheckershowComponent;
  let fixture: ComponentFixture<CheckershowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckershowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckershowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
