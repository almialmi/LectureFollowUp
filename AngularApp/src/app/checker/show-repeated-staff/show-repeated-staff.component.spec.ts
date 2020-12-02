import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRepeatedStaffComponent } from './show-repeated-staff.component';

describe('ShowRepeatedStaffComponent', () => {
  let component: ShowRepeatedStaffComponent;
  let fixture: ComponentFixture<ShowRepeatedStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRepeatedStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRepeatedStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
