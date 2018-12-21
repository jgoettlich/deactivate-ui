import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateRequestTableComponent } from './deactivate-request-table.component';

describe('DeactivateRequestTableComponent', () => {
  let component: DeactivateRequestTableComponent;
  let fixture: ComponentFixture<DeactivateRequestTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivateRequestTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
