import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditBuildingDialogComponent } from './location-edit-building-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatInputModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('LocationEditBuildingDialogComponent', () => {

  /* Added new imports and providers to properly test the editing of buildings. The matstub and diagstub mimick the data and the behavior of 
  the building data and MatDialogRef, respectively.
  */
  class MatStub {
    building = {
      name: 'Bldg 1'
    }
  }
  
  class diagStub {
    close() {}
  }
  let component: LocationEditBuildingDialogComponent;
  let fixture: ComponentFixture<LocationEditBuildingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditBuildingDialogComponent ],
      imports: [MatFormFieldModule, MatDialogModule, FormsModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useClass: diagStub }, { provide: MAT_DIALOG_DATA, useClass: MatStub }]
  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditBuildingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
