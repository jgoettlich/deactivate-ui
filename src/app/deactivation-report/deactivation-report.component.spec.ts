import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivationReportComponent } from './deactivation-report.component';

describe('DeactivationReportComponent', () => {
  let component: DeactivationReportComponent;
  let fixture: ComponentFixture<DeactivationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
