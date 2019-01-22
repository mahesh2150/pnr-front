import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAd72890Component } from './google-ad-728-90.component';

describe('GoogleAd72890Component', () => {
  let component: GoogleAd72890Component;
  let fixture: ComponentFixture<GoogleAd72890Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAd72890Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAd72890Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
