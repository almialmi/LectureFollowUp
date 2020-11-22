import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactussubComponent } from './contactussub.component';

describe('ContactussubComponent', () => {
  let component: ContactussubComponent;
  let fixture: ComponentFixture<ContactussubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactussubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactussubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
