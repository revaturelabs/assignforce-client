import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDeleteUnavailabilityDialogComponent } from './location-delete-unavailability-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('LocationDeleteUnavailabilityDialogComponent', () => {
  let component: LocationDeleteUnavailabilityDialogComponent;
  let fixture: ComponentFixture<LocationDeleteUnavailabilityDialogComponent>;
  /* Added imports and providers necessary for the component to compile. The matstub and diagstub mimick the data and behavior needed
  for this component to be tested. */
  class MatStub {
    unavailability = {
      description: 'description'
    }
  }

  
  class diagStub {
    close() {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDeleteUnavailabilityDialogComponent ],
      imports: [MatDialogModule],
      providers: [{provide: MatDialogRef, useClass: diagStub}, {provide: MAT_DIALOG_DATA, useClass: MatStub}]//missing mock dialog ref
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
