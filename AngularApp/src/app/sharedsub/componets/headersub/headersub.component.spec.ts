import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersubComponent } from './headersub.component';

describe('HeadersubComponent', () => {
  let component: HeadersubComponent;
  let fixture: ComponentFixture<HeadersubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
