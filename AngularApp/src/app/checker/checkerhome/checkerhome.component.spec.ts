import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerhomeComponent } from './checkerhome.component';

describe('CheckerhomeComponent', () => {
  let component: CheckerhomeComponent;
  let fixture: ComponentFixture<CheckerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
