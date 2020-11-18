import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsubsubComponent } from './logsubsub.component';

describe('LogsubsubComponent', () => {
  let component: LogsubsubComponent;
  let fixture: ComponentFixture<LogsubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
