import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettrainbetweenstationsComponent } from './gettrainbetweenstations.component';

describe('GettrainbetweenstationsComponent', () => {
  let component: GettrainbetweenstationsComponent;
  let fixture: ComponentFixture<GettrainbetweenstationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettrainbetweenstationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettrainbetweenstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
