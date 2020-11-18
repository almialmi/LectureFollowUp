import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesubsubComponent } from './homesubsub.component';

describe('HomesubsubComponent', () => {
  let component: HomesubsubComponent;
  let fixture: ComponentFixture<HomesubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
