import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateFormComponent } from './deactivate-form.component';

describe('DeactivateFormComponent', () => {
  let component: DeactivateFormComponent;
  let fixture: ComponentFixture<DeactivateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
