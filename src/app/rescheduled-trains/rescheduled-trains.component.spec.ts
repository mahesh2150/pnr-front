import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduledTrainsComponent } from './rescheduled-trains.component';

describe('RescheduledTrainsComponent', () => {
  let component: RescheduledTrainsComponent;
  let fixture: ComponentFixture<RescheduledTrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescheduledTrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduledTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
