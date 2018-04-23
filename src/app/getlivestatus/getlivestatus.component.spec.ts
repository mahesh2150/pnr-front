import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlivestatusComponent } from './getlivestatus.component';

describe('GetlivestatusComponent', () => {
  let component: GetlivestatusComponent;
  let fixture: ComponentFixture<GetlivestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetlivestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetlivestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
