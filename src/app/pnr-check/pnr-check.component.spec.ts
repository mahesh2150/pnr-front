import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnrCheckComponent } from './pnr-check.component';

describe('PnrCheckComponent', () => {
  let component: PnrCheckComponent;
  let fixture: ComponentFixture<PnrCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnrCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnrCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
