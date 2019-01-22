import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlivestationComponent } from './getlivestation.component';

describe('GetlivestationComponent', () => {
  let component: GetlivestationComponent;
  let fixture: ComponentFixture<GetlivestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetlivestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetlivestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
