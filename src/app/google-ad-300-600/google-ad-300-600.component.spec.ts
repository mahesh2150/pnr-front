import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAd300600Component } from './google-ad-300-600.component';

describe('GoogleAd300600Component', () => {
  let component: GoogleAd300600Component;
  let fixture: ComponentFixture<GoogleAd300600Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAd300600Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAd300600Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
