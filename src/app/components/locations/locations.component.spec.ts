import { from } from './../../../../node_modules/rxjs/observable/from';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth/auth.service';
import { AppMaterialModule } from '../../material.module';
import { LocationsComponent, LocationAddUnavailabilityDialogComponent } from './locations.component';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { LocationAddDialogComponent } from './add-dialog/location-add-dialog.component';
import {
  LocationDeleteLocationDialogComponent,
  LocationOpenUnavailibilityDialogComponent
} from './locations.component';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { Component } from '@angular/core';
import { Building } from '../../model/Building';
import { of } from 'rxjs/observable/of';
import { Unavailability } from '../../model/Unavailability';
import { UnavailableControllerService } from '../../services/api/unavailable-controller/unavailable-controller.service';
import { Room } from '../../model/Room';
import { AddressTestControllerService } from '../../services/api/address-controller/address-test-controller.service';
import { environment } from '../../../environments/environment.local-server';
// service that points to our json test server

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let component3: LocationOpenUnavailibilityDialogComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  const buildingService = {
    findAll: jest.fn().mockImplementation(() => {
      const buildings: Building[] = [
        {
          id: 1,
          buildingId: 1,
          isActive: true,
          buildingName: '11730 Plaza American Drive (HQ)',
          address: 1,
          rooms: []
        }
      ];
      return of(buildings);
    })
  };

  class AuthServStub {
    userHasRole(strings: string[]) {
      return true;
    }
  }
  class domStub {
    url: string;
    bypassSecurityTrustResourceUrl(url: string) {}
  }

  class MatDialogStub {
    open(comp: any, meta: any) {}
  }

  class IconStub {
    addSvgIcon(locationType: any, sanitizer: any) {}
  }

  class diagStub {
    close() {}
    afterClosed() {}
  }
  const iconRegistry = new IconStub();
  const sanitizer = new domStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserAnimationsModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        LocationsComponent,
        LocationAddDialogComponent,
        LocationDeleteLocationDialogComponent,
        LocationOpenUnavailibilityDialogComponent
        // AddressTestControllerService
      ],
      providers: [
        BuildingControllerService,
        AddressControllerService,
        RoomControllerService,
        CachedObjectsService,
        UnavailableControllerService,
        AddressTestControllerService,
        { provide: BuildingControllerService, usevalue: buildingService },
        { provide: AuthService, useclass: AuthServStub },
        { provide: MAT_DIALOG_DATA, useclass: MatDialogStub },
        { provide: MatDialogRef, useclass: diagStub },
        { provide: DomSanitizer, useValue: sanitizer },
        { provide: MatDialog, useclass: MatDialogStub },
        { provide: MatIconRegistry, useValue: iconRegistry }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    addressTestControllerService = TestBed.get(AddressTestControllerService);

    spyOn(addressTestControllerService, 'findAll').and.callThrough();
  });

  // //
  // afterEach(() => {
  //   this.httpMock.verify();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //List of tests to add from locations.component.ts, not concerned with creating tests for dialog windows
  // Need to add test for LocationEditRoomDialogComponent onAdd method (line 148)

  // Tests for LocationOpenUnavailibilityDialogComponent validDates method (line 304)

  it('should create a vaild date', () => {
    // Ideally, component3 should be defined in the beforeEach, but was experiencing problems until
    //attempting this way - Joe Milne & Chris Oberg
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    const start: Date = new Date('December 16, 2019');
    const end: Date = new Date('December 17, 2019');
    expect(component3.validDates(start, end)).toEqual(true);
  });

  it('should create an invalid date', () => {
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    const start: Date = new Date('December 17, 2019');
    const end: Date = new Date('December 16, 2019');
    expect(component3.validDates(start, end)).toEqual(false);
  });

  // Need to add test for LocationOpenUnavailibilityDialogComponent duplicate method (line 343)

  it('should return true since there is a duplicate', () => {
    let unavailabilityTest: Unavailability = {
      id: 3,
      startDate: new Date(2019, 2, 13),
      endDate: new Date(2019, 3, 8),
      description: 'Bad Test',
      room: 1
    };
    const roomTest: Room = {
      id: 1,
      roomName: 'Testing Room',
      building: 1,
      active: true,
      unavailabilities: [
        { id: 1, startDate: new Date(2019, 2, 13), endDate: new Date(2019, 3, 8), description: 'Dummy One', room: 1 },
        { id: 2, startDate: new Date(2019, 7, 4), endDate: new Date(2019, 7, 21), description: 'Dummy Two', room: 1 }
      ]
    };

    let num = 1;
    const unavailabilityTest: Unavailability = {id: 3, startDate: new Date(2019, 2, 13), endDate: new Date(2019, 3, 8), description: 'Bad Test', room: 1};
    const roomTest: Room = {id: 1, roomName: 'Testing Room', building: 1, active: true, unavailabilities: [{id: 1, startDate: new Date(2019, 2, 13), endDate: new Date(2019, 3, 8), description: 'Dummy One', room: 1}, {id: 2, startDate: new Date(2019, 7, 4), endDate: new Date(2019, 7, 21), description: 'Dummy Two', room: 1}]};
    const num = 1;
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    expect(component3.duplicate(unavailabilityTest, roomTest, num)).toEqual(true);
  });

  it('should return false since there is not a duplicate', () => {

    let unavailabilityTest: Unavailability = {
      id: 3,
      startDate: new Date(2019, 8, 21),
      endDate: new Date(2019, 9, 20),
      description: 'Good Test',
      room: 1
    };
    let roomTest: Room = {
      id: 1,
      roomName: 'Testing Room',
      building: 1,
      active: true,
      unavailabilities: [
        { id: 1, startDate: new Date(2019, 2, 13), endDate: new Date(2019, 3, 8), description: 'Dummy One', room: 1 },
        { id: 2, startDate: new Date(2019, 7, 4), endDate: new Date(2019, 7, 21), description: 'Dummy Two', room: 1 }
      ]
    };
    let num = 1;
    const unavailabilityTest: Unavailability = {id: 3, startDate: new Date(2019, 8, 21), endDate: new Date(2019, 9, 20), description: 'Good Test', room: 1};
    const roomTest: Room = {id: 1, roomName: 'Testing Room', building: 1, active: true, unavailabilities: [{id: 1, startDate: new Date(2019, 2, 13), endDate: new Date(2019, 3, 8), description: 'Dummy One', room: 1}, {id: 2, startDate: new Date(2019, 7, 4), endDate: new Date(2019, 7, 21), description: 'Dummy Two', room: 1}]};
    const num = 1;
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    expect(component3.duplicate(unavailabilityTest, roomTest, num)).toEqual(false);
  });

  // Tests for LocationOpenUnavailibilityDialogComponent dateEquals method (line 367)

  it('should create 2 dates of the same time length', () => {
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    const start1: Date = new Date('December 17, 2019');
    const start2: Date = new Date('December 17, 2019');
    const end1: Date = new Date('March 8, 2020');
    const end2: Date = new Date('March 8, 2020');
    expect(component3.dateEquals(start1, start2)).toEqual(true);
    expect(component3.dateEquals(end1, end2)).toEqual(true);
  });

  it('should create 2 dates of the same time length (not the same dates however), returning false', () => {
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    const start1: Date = new Date('December 17, 2019');
    const start2: Date = new Date('December 16, 2019');
    const end1: Date = new Date('March 8, 2020');
    const end2: Date = new Date('March 7, 2020');
    expect(component3.dateEquals(start1, start2)).toEqual(false);
    expect(component3.dateEquals(end1, end2)).toEqual(false);
  });

  // Need to add test for LocationOpenUnavailibilityDialogComponent deleteUnavailability method (line 384)
  // Need to add test for LocationOpenUnavailibilityDialogComponent updateUnavailability method (line 395)
  // Need to add test for LocationOpenUnavailibilityDialogComponent addUnavailability method (line 404)
  // Need to add test for LocationOpenUnavailibilityDialogComponent loadUnavailability method (line 414)
  // Need to add test for LocationOpenUnavailibilityDialogComponent roomUnavailabilities method (line 423)
  // Need to add test for LocationOpenUnavailibilityDialogComponent notBlank method (line 432)

  it('should not fail because the name has something in it', () => {
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    const test = "Test";
    expect(component3.notBlank(test)).toEqual(true);
  });

  // This test will throw an error because it does not know how to handle the window.alert,
  //it does pass the test as expected however.
  it('should fail because the name does not have any content in it', () => {
    component3 = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent).componentInstance;
    const test = "  ";
    expect(component3.notBlank(test)).toEqual(false);
  });

  // Need to add test for LocationsComponent loadLocations method (line 480)
  // Need to add test for LocationsComponent loadBuildings method (line 490)
  // Need to add test for LocationsComponent loadRooms method (line 495)
  // Need to add test for LocationsComponent locationBuildings method (line 507)
  // Need to add test for LocationsComponent locationRooms method (line 511)
  // Need to add test for LocationsComponent collapseAll method (line 515) ?
  // Need to add test for LocationsComponent addLocation method (line 526)
  // Need to add test for LocationsComponent addBuilding method (line 542)
  // Need to add test for LocationsComponent addRoom method (line 552)
  // Need to add test for LocationsComponent updateLocation method (line 586)
  // Need to add test for LocationsComponent updateBuilding method (line 595)
  // Need to add test for LocationsComponent updateRoom method (line 615)
  // Need to add test for LocationsComponent deleteLocation method (line 624)
  // Need to add test for LocationsComponent deleteBuilding method (line 631)
  // Need to add test for LocationsComponent deleteRoom method (line 635)
  // Need to add test for LocationsComponent notBlank method (line 842)

  it('should return true since the name provided contains content other than spaces', () => { 
    const test = "Test";
  it('should return true since the name provided contains content other than spaces', () => {
    const test = 'Test';
    expect(component.notBlank(test)).toEqual(true);
  });

  // This will also throw an error because of the window.alert, functions as expected however.
  it('should return false since the name provided does not contain meaningful content', () => {
    const test = "  ";
    expect(component.notBlank(test)).toEqual(false);
  });

  // Need to add test for LocationsComponent checkRoomUnique method (line 851)
  // Need to add test for LocationsComponent checkLocationUnique method (line 867)
  // Need to add test for LocationsComponent checkBuildingUnique method (line 883)

  it('should return false since building name & address are the same', () => {
    const building1 = new Building(true, 1, 'NEC', null, 14);
    const building2 = new Building(true, 2, 'NEC', null, 14);
    component.buildings.push(building1);
    expect(component.checkBuildingUnique(building2)).toBe(false);
  });
  it('should return true since building name is not the same', () => {
    const building1 = new Building(true, 1, 'NED', null, 14);
    const building2 = new Building(true, 2, 'NEC', null, 14);
    component.buildings.push(building1);
    expect(component.checkBuildingUnique(building2)).toBe(true);
  });

  it('should get all addresses', () => {
    // let addressController = environment.apiUrls.addressController;
    // let service = TestBed.createComponent(AddressTestControllerService).componentInstance;
    // const request = httpMock.expectOne(addressController + addressController.findAll);
    addressTestControllerService.findAll().subscribe(result => {
      // expect(result['addresses'].length).toBe('');
      expect(result).toBeNull(false);
      // expect(request.request.method).toBe('GET');
    });
  });
});
