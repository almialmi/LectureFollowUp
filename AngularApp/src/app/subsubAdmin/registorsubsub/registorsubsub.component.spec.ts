import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistorsubsubComponent } from './registorsubsub.component';

describe('RegistorsubsubComponent', () => {
  let component: RegistorsubsubComponent;
  let fixture: ComponentFixture<RegistorsubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistorsubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistorsubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
