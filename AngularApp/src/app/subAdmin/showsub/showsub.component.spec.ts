import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsubComponent } from './showsub.component';

describe('ShowsubComponent', () => {
  let component: ShowsubComponent;
  let fixture: ComponentFixture<ShowsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
