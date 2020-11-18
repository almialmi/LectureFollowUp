import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsubComponent } from './logsub.component';

describe('LogsubComponent', () => {
  let component: LogsubComponent;
  let fixture: ComponentFixture<LogsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
