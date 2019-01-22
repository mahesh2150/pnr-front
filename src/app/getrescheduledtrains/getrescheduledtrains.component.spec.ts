import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetrescheduledtrainsComponent } from './getrescheduledtrains.component';

describe('GetrescheduledtrainsComponent', () => {
  let component: GetrescheduledtrainsComponent;
  let fixture: ComponentFixture<GetrescheduledtrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetrescheduledtrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetrescheduledtrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
