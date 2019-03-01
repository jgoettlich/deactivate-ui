import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReasonComponent } from './request-reason.component';

describe('RequestReasonComponent', () => {
  let component: RequestReasonComponent;
  let fixture: ComponentFixture<RequestReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
