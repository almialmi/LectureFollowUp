import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutcheckerComponent } from './aboutchecker.component';

describe('AboutcheckerComponent', () => {
  let component: AboutcheckerComponent;
  let fixture: ComponentFixture<AboutcheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutcheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutcheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
