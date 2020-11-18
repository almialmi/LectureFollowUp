import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesubComponent } from './homesub.component';

describe('HomesubComponent', () => {
  let component: HomesubComponent;
  let fixture: ComponentFixture<HomesubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
