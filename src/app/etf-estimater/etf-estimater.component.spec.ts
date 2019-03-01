import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtfEstimaterComponent } from './etf-estimater.component';

describe('EtfEstimaterComponent', () => {
  let component: EtfEstimaterComponent;
  let fixture: ComponentFixture<EtfEstimaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtfEstimaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtfEstimaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
