import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetseatavailabilityComponent } from './getseatavailability.component';

describe('GetseatavailabilityComponent', () => {
  let component: GetseatavailabilityComponent;
  let fixture: ComponentFixture<GetseatavailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetseatavailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetseatavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
