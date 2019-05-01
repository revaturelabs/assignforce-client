import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddUnavailabilityDialogComponent } from './location-add-unavailability-dialog.component';

describe('LocationAddUnavailabilityDialogComponent', () => {
  let component: LocationAddUnavailabilityDialogComponent;
  let fixture: ComponentFixture<LocationAddUnavailabilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAddUnavailabilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAddUnavailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
