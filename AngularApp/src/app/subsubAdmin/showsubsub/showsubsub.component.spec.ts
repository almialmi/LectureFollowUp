import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsubsubComponent } from './showsubsub.component';

describe('ShowsubsubComponent', () => {
  let component: ShowsubsubComponent;
  let fixture: ComponentFixture<ShowsubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
