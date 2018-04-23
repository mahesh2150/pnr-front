import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettrainrouteComponent } from './gettrainroute.component';

describe('GettrainrouteComponent', () => {
  let component: GettrainrouteComponent;
  let fixture: ComponentFixture<GettrainrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettrainrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettrainrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
