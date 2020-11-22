import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersubsubComponent } from './headersubsub.component';

describe('HeadersubsubComponent', () => {
  let component: HeadersubsubComponent;
  let fixture: ComponentFixture<HeadersubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
