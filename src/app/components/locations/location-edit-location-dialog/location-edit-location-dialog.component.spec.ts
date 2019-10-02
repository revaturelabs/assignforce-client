import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditLocationDialogComponent } from './location-edit-location-dialog.component';
import { MatFormFieldModule, MatFormField, MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationEditLocationDialogComponent', () => {

  /*Added the modules needed for this component to compile. Also provided mock data and a mock dialogref to mimick the function of the component. */
  class MatStub {
    location = 'Oviedo';
    city = 'Tampa';
    state = 'Florida';
  }
  
  class diagStub {
    close() {}
  }
  let component: LocationEditLocationDialogComponent;
  let fixture: ComponentFixture<LocationEditLocationDialogComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditLocationDialogComponent ],
      imports: [MatFormFieldModule, MatDialogModule, FormsModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useClass: diagStub }, { provide: MAT_DIALOG_DATA, useClass: MatStub }]
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditLocationDialogComponent);
    let matForm = fixture.debugElement.query(By.css('.update-form'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
