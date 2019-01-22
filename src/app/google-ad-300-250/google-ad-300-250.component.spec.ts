import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAd300250Component } from './google-ad-300-250.component';

describe('GoogleAd300250Component', () => {
  let component: GoogleAd300250Component;
  let fixture: ComponentFixture<GoogleAd300250Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAd300250Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAd300250Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
