import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistorsubComponent } from './registorsub.component';

describe('RegistorsubComponent', () => {
  let component: RegistorsubComponent;
  let fixture: ComponentFixture<RegistorsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistorsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistorsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
