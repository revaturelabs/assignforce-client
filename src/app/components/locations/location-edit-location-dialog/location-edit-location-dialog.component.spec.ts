import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditLocationDialogComponent } from './location-edit-location-dialog.component';
import { MatFormFieldModule, MatFormField, MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationEditLocationDialogComponent', () => {
  class MatStub {
    // addType: any;
    // building: any;
    // location: any;
    // room: any;
    // test: 'test'
    location = 'Oviedo';
    city = 'Tampa';
    state = 'Florida';
  }
  
  class diagStub {
    close() {}
  }
  let component: LocationEditLocationDialogComponent;
  let fixture: ComponentFixture<LocationEditLocationDialogComponent>;
  let dialog: MatDialog;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditLocationDialogComponent ],
      imports: [MatFormFieldModule, MatDialogModule, FormsModule, MatInputModule, BrowserAnimationsModule],
      // providers: [{provide: MatDialogRef, useValue: dialog}, {provide: MAT_DIALOG_DATA, useValue: {}}]
      providers: [{ provide: MatDialogRef, useClass: diagStub }, { provide: MAT_DIALOG_DATA, useClass: MatStub }]
  
      // missing a mock dialog ref, mat-dialog-close
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // let formField = new MatFormField();
    
    fixture = TestBed.createComponent(LocationEditLocationDialogComponent);
    let matForm = fixture.debugElement.query(By.css('.update-form'));
    // let dialog = new MatDialogRef<LocationEditLocationDialogComponent, any>(null,null,null,null);
    // fixture.
    component = fixture.componentInstance;
    // component.dialogRef = dialog;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
