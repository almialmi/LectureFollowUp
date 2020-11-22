import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutussubsubComponent } from './aboutussubsub.component';

describe('AboutussubsubComponent', () => {
  let component: AboutussubsubComponent;
  let fixture: ComponentFixture<AboutussubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutussubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutussubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
