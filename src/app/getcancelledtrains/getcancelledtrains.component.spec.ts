import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcancelledtrainsComponent } from './getcancelledtrains.component';

describe('GetcancelledtrainsComponent', () => {
  let component: GetcancelledtrainsComponent;
  let fixture: ComponentFixture<GetcancelledtrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcancelledtrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcancelledtrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
