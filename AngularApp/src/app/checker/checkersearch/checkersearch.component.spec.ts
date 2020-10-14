import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckersearchComponent } from './checkersearch.component';

describe('CheckersearchComponent', () => {
  let component: CheckersearchComponent;
  let fixture: ComponentFixture<CheckersearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckersearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
