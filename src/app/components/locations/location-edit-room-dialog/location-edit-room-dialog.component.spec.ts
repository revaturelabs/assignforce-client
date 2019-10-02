import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatFormField, MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatInputModule, MatDatepicker, MatDatepickerModule, DateAdapter, MatNativeDateModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocationEditRoomDialogComponent } from './location-edit-room-dialog.component';

describe('LocationEditRoomDialogComponent', () => {
  let component: LocationEditRoomDialogComponent;
  let fixture: ComponentFixture<LocationEditRoomDialogComponent>;
 /*Added imports/providers for this test to pass. The matstub and diagstub classes mimick the data and dialog box behavior needed for the
 testing of this component. */
  class MatStub {
    
    room: any = 'room';
    name: any = 'sam';
   
  }
  
  class diagStub {
    close() {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditRoomDialogComponent ],
      imports: [MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatDialogModule, FormsModule, MatInputModule, BrowserAnimationsModule],
      // providers: [{provide: MatDialogRef, useValue: dialog}, {provide: MAT_DIALOG_DATA, useValue: {}}]
      providers: [{ provide: MatDialogRef, useClass: diagStub }, { provide: MAT_DIALOG_DATA, useClass: MatStub }]
  
    })
    .compileComponents();
  }));
  // MatDatepicker: No provider found for DateAdapter. You must import one of the following modules at your application root: MatNativeDateModule, MatMomentDateModule, or provide a custom implementation.

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
