import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditBuildingDialogComponent } from './location-edit-building-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatInputModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('LocationEditBuildingDialogComponent', () => {
  class MatStub {
    // addType: any;
    // building: any;
    // location: any;
    // room: any;
    // test: 'test'
    building = {
      name: 'Bldg 1'
    }
      // city = 'Tampa';
    // state = 'Florida';
  }
  
  class diagStub {
    close() {}
  }
  let component: LocationEditBuildingDialogComponent;
  let fixture: ComponentFixture<LocationEditBuildingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditBuildingDialogComponent ],
      // providers: [FormsModule],
      imports: [MatFormFieldModule, MatDialogModule, FormsModule, MatInputModule, BrowserAnimationsModule],
      // providers: [{provide: MatDialogRef, useValue: dialog}, {provide: MAT_DIALOG_DATA, useValue: {}}]
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
