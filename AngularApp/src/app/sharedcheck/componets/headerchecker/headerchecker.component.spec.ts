import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercheckerComponent } from './headerchecker.component';

describe('HeadercheckerComponent', () => {
  let component: HeadercheckerComponent;
  let fixture: ComponentFixture<HeadercheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadercheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadercheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
