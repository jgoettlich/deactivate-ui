import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateDeviceComponent } from './deactivate-device.component';

describe('SwapDeviceComponent', () => {
  let component: DeactivateDeviceComponent;
  let fixture: ComponentFixture<DeactivateDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivateDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
