import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledTrainsComponent } from './cancelled-trains.component';

describe('CancelledTrainsComponent', () => {
  let component: CancelledTrainsComponent;
  let fixture: ComponentFixture<CancelledTrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledTrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
