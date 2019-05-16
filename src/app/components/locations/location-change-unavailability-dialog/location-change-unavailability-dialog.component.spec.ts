import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChangeUnavailabilityDialogComponent } from './location-change-unavailability-dialog.component';

describe('LocationChangeUnavailabilityDialogComponent', () => {
  let component: LocationChangeUnavailabilityDialogComponent;
  let fixture: ComponentFixture<LocationChangeUnavailabilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationChangeUnavailabilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationChangeUnavailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
