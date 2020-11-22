import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactcheckerComponent } from './contactchecker.component';

describe('ContactcheckerComponent', () => {
  let component: ContactcheckerComponent;
  let fixture: ComponentFixture<ContactcheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactcheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactcheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
