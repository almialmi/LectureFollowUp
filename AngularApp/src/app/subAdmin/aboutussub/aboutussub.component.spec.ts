import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutussubComponent } from './aboutussub.component';

describe('AboutussubComponent', () => {
  let component: AboutussubComponent;
  let fixture: ComponentFixture<AboutussubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutussubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutussubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
