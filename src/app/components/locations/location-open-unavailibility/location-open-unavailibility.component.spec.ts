import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LocationOpenUnavailibilityDialogComponent } from './location-open-unavailibility.component';
import { MatExpansionModule, MatIconModule, MatListModule, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { RoomControllerService } from '../../../services/api/room-controller/room-controller.service';
import { UnavailableControllerService } from '../../../services/api/unavailable-controller/unavailable-controller.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Unavailability } from '../../../model/Unavailability';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationOpenUnavailibilityComponent', () => {
  let component: LocationOpenUnavailibilityDialogComponent;
  let fixture: ComponentFixture<LocationOpenUnavailibilityDialogComponent>;

  /*Added imports and providers needed for this component to compile. Added the matstub and diagstub to mimick the intended function/purpose
  of the component. */
  class MatStub {
    
    room = {
      id: '1'
    } 
  }
  class diagStub {
    close() {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationOpenUnavailibilityDialogComponent ],
      imports: [HttpClientTestingModule,MatExpansionModule, MatIconModule, MatListModule, MatDialogModule, BrowserAnimationsModule],
      providers: [ RoomControllerService, {provide: MatDialogRef, useValue: diagStub},
                UnavailableControllerService, { provide: MAT_DIALOG_DATA, useClass: MatStub }, 
                HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let unavailableContServ = TestBed.get(UnavailableControllerService);
    let http = TestBed.get(HttpTestingController)
    // let unavailabilityServ = new UnavailableControllerService.
    fixture = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([UnavailableControllerService], (service: UnavailableControllerService) => {
    expect(component).toBeTruthy();
  }));
});
