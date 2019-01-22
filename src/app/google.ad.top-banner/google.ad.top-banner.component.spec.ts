import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAdTopBannerComponent } from './google.ad.top-banner.component';

describe('Google.Ad.TopBannerComponent', () => {
  let component: GoogleAdTopBannerComponent;
  let fixture: ComponentFixture<GoogleAdTopBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAdTopBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAdTopBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
