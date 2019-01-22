import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettrainfareComponent } from './gettrainfare.component';

describe('GettrainfareComponent', () => {
  let component: GettrainfareComponent;
  let fixture: ComponentFixture<GettrainfareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettrainfareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettrainfareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
