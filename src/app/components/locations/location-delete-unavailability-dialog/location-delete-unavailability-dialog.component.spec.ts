import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDeleteUnavailabilityDialogComponent } from './location-delete-unavailability-dialog.component';

describe('LocationDeleteUnavailabilityDialogComponent', () => {
  let component: LocationDeleteUnavailabilityDialogComponent;
  let fixture: ComponentFixture<LocationDeleteUnavailabilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDeleteUnavailabilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteUnavailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
