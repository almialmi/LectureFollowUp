import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsubsubComponent } from './contactsubsub.component';

describe('ContactsubsubComponent', () => {
  let component: ContactsubsubComponent;
  let fixture: ComponentFixture<ContactsubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
