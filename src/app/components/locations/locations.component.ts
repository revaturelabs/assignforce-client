import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Building } from '../../model/Building';
import { Address } from '../../model/Address';
import { Room } from '../../model/Room';
import { LocationAddDialogComponent } from './add-dialog/location-add-dialog.component';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { UnavailableControllerService } from '../../services/api/unavailable-controller/unavailable-controller.service';
import { AuthService } from '../../services/auth/auth.service';
import { Unavailability } from '../../model/Unavailability';

import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';

@Component({
  selector: 'app-location-delete-location-dialog',
  templateUrl: './location-delete-location-dialog.component.html'
})

// Dialog Components which reference the respective html templates in this component

// At some point, we may want a LocationAddBuildingDialogComponent since it just uses
// the LocationAddDialogComponent default, which references the buildingName anyways
// so it's pretty much a LocationAddBuildingDialogComponent already.
export class LocationDeleteLocationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDeleteLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-add-location-dialog',
  templateUrl: './location-add-location-dialog.component.html'
})
export class LocationAddLocationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationAddLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-edit-location-dialog',
  templateUrl: './location-edit-location-dialog.component.html'
})
export class LocationEditLocationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationEditLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-delete-building-dialog',
  templateUrl: './location-delete-building-dialog.component.html'
})
export class LocationDeleteBuildingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDeleteBuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-edit-building-dialog',
  templateUrl: './location-edit-building-dialog.component.html'
})
export class LocationEditBuildingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationEditBuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-add-room-dialog',
  templateUrl: './location-add-room-dialog.component.html'
})
export class LocationAddRoomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationAddRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-delete-room-dialog',
  templateUrl: './location-delete-room-dialog.component.html'
})
export class LocationDeleteRoomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDeleteRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-edit-room-dialog',
  templateUrl: './location-edit-room-dialog.component.html'
})
export class LocationEditRoomDialogComponent {
  startDate = new Date();
  endDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<LocationEditRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.data.room.unavailabilities === undefined) {
      const check: Unavailability[] = [];
      this.data.room.unavailabilities = check;
    }
  }
}

@Component({
  selector: 'app-location-delete-unavailability-dialog',
  templateUrl: './location-delete-unavailability-dialog.component.html'
})
export class LocationDeleteUnavailabilityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDeleteUnavailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-add-unavailability-dialog',
  templateUrl: './location-add-unavailability-dialog.component.html'
})
export class LocationAddUnavailabilityDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LocationAddUnavailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-change-unavailibility-dialog',
  templateUrl: './location-change-unavailibility-dialog.component.html'
})
export class LocationChangeUnavailabilityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationChangeUnavailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-location-open-unavailibility-dialog',
  templateUrl: './location-open-unavailibility.component.html'
})
export class LocationOpenUnavailibilityDialogComponent implements OnInit {
  unavailibilities: Unavailability[] = [];

  constructor(
    private roomService: RoomControllerService,
    //Hernan
    public dialog: MatDialog,
    private unavailibilityService: UnavailableControllerService,
    public dialogRef: MatDialogRef<LocationOpenUnavailibilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // Hernan
    // console.log('LocationOpenUnavailibilityDialogComponent ngOnInit() no longer used');
    this.loadUnavailibilities();
  }

  openAddUnvailibilityDialog(evt, room: Room): void {
    evt.stopPropagation();
    const unavailibility = new Unavailability(0, new Date(), new Date(), 'test', room.id);

    const dialogRef = this.dialog.open(LocationAddUnavailabilityDialogComponent, {
      width: '450 px',
      data: {
        addType: 'unavailibility',
        unavailibility: unavailibility
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.notBlank(unavailibility.description)) {
        if (!this.validDates(unavailibility.startDate, unavailibility.endDate)) {
          window.alert('Not a valid set of dates!');
        } else {
          if (this.duplicate(unavailibility, room, 1)) {
            window.alert('This unavailability time frame already exists for this room');
          } else {
            this.addUnavailibility(unavailibility, room);
          }
        }
        // Hernan
        // this.addUnavailibility(unavailibility);
      }
    });
  }

  openChangeUnavailibilityDialog(evt, unavailability: Unavailability, room: Room): void {
    evt.stopPropagation();

    let original = new Unavailability(
      unavailability.id,
      unavailability.startDate,
      unavailability.endDate,
      unavailability.description,
      unavailability.room
    );
    const index = room.unavailabilities.indexOf(unavailability);

    const dialogRef = this.dialog.open(LocationChangeUnavailabilityDialogComponent, {
      width: '450 px',
      data: {
        unavailability: unavailability
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        room.unavailabilities[index] = original;
      }
      if (result && this.notBlank(unavailability.description)) {
        if (!this.validDates(unavailability.startDate, unavailability.endDate)) {
          window.alert('Not a valid set of dates');
          room.unavailabilities[index] = original;
        } else {
          if (this.duplicate(unavailability, room, 2)) {
            window.alert('Updating will result in a duplicate time frame');
            room.unavailabilities[index] = original;
          } else {
            this.roomService.update(room).subscribe();
          }
        }
      } else {
        // Cannot enter a blank name
        room.unavailabilities[index] = original;
      }
    });
  }

  validDates(newStart: Date, newEnd: Date): boolean {
    const start = new Date(newStart.toString());
    const end = new Date(newEnd.toString());
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    console.log('Loaded start date: ' + start);
    console.log('Loaded end date: ' + end);

    if (end < start) {
      console.log(' are INVALID DATES');
      return false;
    } else {
      console.log(' are VALID DATES');
      return true;
    }
  }

  openDeleteUnavailibilityDialog(evt, unavailability: Unavailability, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteUnavailabilityDialogComponent, {
      width: '250px',
      data: {
        unavailability: unavailability
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = room.unavailabilities.indexOf(unavailability);
        room.unavailabilities.splice(index, 1);
        this.roomService.update(room).subscribe();
      }
    });
  }

  duplicate(unavailability: Unavailability, room: Room, num: Number): boolean {
    let newStart = new Date(unavailability.startDate.toString());
    let newEnd = new Date(unavailability.endDate.toString());
    let ctr = 0;

    if (room.unavailabilities) {
      for (let unavail of room.unavailabilities) {
        let roomStart = new Date(unavail.startDate.toString());
        let roomEnd = new Date(unavail.endDate.toString());
        if (this.dateEquals(newStart, roomStart) && this.dateEquals(newEnd, roomEnd)) {
          ctr++;
          console.log('found same time frame');
        }
      }
    }

    if (ctr >= num) {
      return true;
    } else {
      return false;
    }
  }

  dateEquals(d1: Date, d2: Date): boolean {
    const date1 = new Date(d1.toString());
    const date2 = new Date(d2.toString());
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    console.log('date 1: ' + date1 + ' date 2: ' + date2);
    console.log(date1 === date2);

    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  }

  deleteUnavailibility(unavailability: Unavailability) {
    this.unavailibilityService.remove(unavailability.id).subscribe(
      () => {},
      () => {},
      () => {
        this.loadUnavailibilities();
      }
    );
    this.loadUnavailibilities();
  }

  updateUnavailibility(unavailability: Unavailability) {
    this.unavailibilityService.update(unavailability).subscribe(
      () => {},
      () => {},
      () => {
        this.loadUnavailibilities();
      }
    );
  }
  addUnavailibility(unavailibility: Unavailability, room: Room) {
    this.unavailibilityService.create(unavailibility).subscribe(
      () => {},
      () => {},
      () => {
        this.unavailibilities.push(unavailibility);
        room.unavailabilities = room.unavailabilities || [];
        room.unavailabilities.push(unavailibility);
        this.loadUnavailibilities();
      }
    );
  }

  loadUnavailibilities() {
    this.unavailibilityService
      .findAll()
      .toPromise()
      .then((unavailibilities: Unavailability[]) => {
        this.unavailibilities = unavailibilities;
      });
  }

  roomUnavailibilities(id: number): Unavailability[] {
    const filtered = this.unavailibilities.filter(rm => rm.room === id);

    return filtered;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  notBlank(content: String) {
    if (content.replace(/\s/g, '').length === 0) {
      alert('Name field cannot be left blank');
      return false;
    } else {
      return true;
    }
  }
}
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocationsComponent implements OnInit {
  expanded: boolean[] = [];
  locations: Address[] = [];
  buildings: Building[] = [];
  rooms: Room[] = [];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private locationService: AddressControllerService,
    private buildingService: BuildingControllerService,
    private roomService: RoomControllerService,
    public auth0: AuthService,
    private cachingService: CachedObjectsService
  ) {
    for (const location of this.locations) {
      this.expanded[location.id] = false;
    }

    iconRegistry.addSvgIcon(
      'location',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_location_city_black_48px.svg')
    );
    iconRegistry.addSvgIcon(
      'building',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_business_black_48px.svg')
    );
    iconRegistry.addSvgIcon('room', sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_business_black_48px.svg'));
  }

  canceld = false;

  loadLocations() {
    this.locationService
      .findAll()
      .toPromise()
      .then((locations: Address[]) => {
        this.locations = locations;
        this.cachingService.setLocations(locations);
      });
  }

  loadBuildings() {
    this.buildingService.findAll().subscribe(buildings => {
      this.buildings = buildings;
      for (let b of buildings) {
        if (b.buildingId === null) {
          b.buildingId = b.id;
          this.updateBuilding(this.locations[this.locations.findIndex(searchFor => searchFor.id === b.address)], b);
        }
      }
    });
  }

  loadRooms() {
    this.roomService.findAll().subscribe(rooms => (this.rooms = rooms));
  }

  ngOnInit() {
    this.loadLocations();
    this.loadBuildings();
    this.loadRooms();
  }

  // Returns all the buildings of a location
  locationBuildings(id: number) {
    return this.buildings.filter(building => building.address === id);
  }

  buildingRooms(id: number): Room[] {
    return this.rooms.filter(rm => rm.building === id);
  }

  collapseAll(id: any) {
    this.expanded[id] = !this.expanded[id];

    for (const location of this.locations) {
      if (location.id !== id) {
        this.expanded[location.id] = false;
      }
    }
  }

  //Add functions
  addLocation(location: Address) {
    console.log(location);
    if (this.checkLocationUnique(location)) {
      this.locationService
        .create(location)
        .toPromise()
        .then(loc => {
          this.loadLocations();
        });
    } else {
      window.alert('That location already exists');
    }
  }
  addBuilding(location: Address, building: Building) {
    //building.address = location.id;
    if (this.checkBuildingUnique(building)) {
      this.buildingService.create(building).subscribe(resp => this.loadBuildings());
    } else {
      window.alert('That building already exists at that location');
    }
  }

  addRoom(location: Address, building: Building, room: Room) {
    if (this.checkRoomUnique(room)) {
      //
      this.roomService
        .create(room)
        .toPromise()
        .then(() => {
          this.loadRooms();
        });
    } else {
      window.alert('That room already exists');
    }
  }

  //Update functions
  updateLocation(location: Address) {
    this.locationService
      .update(location)
      .toPromise()
      .then(loc => {
        this.loadLocations();
      });
  }
  updateBuilding(location: Address, building: Building) {
    let newLocation = location;
    for (let i = 0; i < newLocation.buildings.length; i++) {
      if (newLocation.buildings[i].buildingId === building.buildingId) {
        newLocation.buildings[i] = building;
        break;
      }
    }
    //
    this.buildingService
      .update(building)
      .toPromise()
      .then(building => {
        this.loadBuildings();
      });
  }
  updateRoom(location: Address, building: Building, room: Room) {
    room.building = building.buildingId;
    this.roomService.update(room).subscribe(resp => this.loadRooms());
  }

  //Delete functions
  deleteLocation(location: Address) {
    this.locationService
      .remove(location.id)
      .toPromise()
      .then(loc => {
        this.loadLocations();
      });
  }
  deleteBuilding(location: Address, building: Building) {
    this.buildingService.remove(building.buildingId).subscribe(resp => this.loadBuildings());
  }
  deleteRoom(location: Address, building: Building, room: Room) {
    this.roomService.remove(room.id).subscribe(resp => this.loadRooms());
  }

  //Add Dialogs
  openAddLocationDialog(evt): void {
    evt.stopPropagation();
    const location = new Address(null, '', '', '', [], true);
    const dialogRef = this.dialog.open(LocationAddLocationDialogComponent, {
      width: '450px',
      data: {
        addType: 'location',
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.notBlank(location.name)) {
        this.addLocation(location);
      }
    });
  }

  openAddBuildingDialog(evt, location: Address): void {
    evt.stopPropagation();
    console.log(location);
    const building = new Building(true, null, '', [], location.id);
    const dialogRef = this.dialog.open(LocationAddDialogComponent, {
      width: '450px',
      data: {
        addType: 'building',
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.notBlank(building.buildingName)) {
        this.addBuilding(location, building);
      }
    });
  }
  openAddRoomDialog(evt, location: Address, building: Building): void {
    evt.stopPropagation();
    const room = new Room(null, true, '', building.buildingId, []);
    const dialogRef = this.dialog.open(LocationAddRoomDialogComponent, {
      width: '450px',
      data: {
        addType: 'room',
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.notBlank(room.roomName)) {
        this.addRoom(location, building, room);
      }
    });
  }

  //Update Dialogs
  openEditLocationDialog(evt, location: Address): void {
    const original = new Address(
      location.id,
      location.name,
      location.city,
      location.state,
      location.buildings,
      location.isActive
    );
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditLocationDialogComponent, {
      width: '450px',
      data: {
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.notBlank(location.name)) {
        if (this.checkLocationUnique(location)) {
          this.updateLocation(result);
        } else {
          this.updateLocation(original);
          window.alert('That location already exists');
        }
      } else {
        for (let locationIndex = 0; locationIndex < this.locations.length; locationIndex++) {
          if (this.locations[locationIndex].id === original.id) {
            this.locations[locationIndex] = original;
            break;
          }
        }
      }
    });
  }
  openEditBuildingDialog(evt, location: Address, building: Building): void {
    const original = new Building(
      building.isActive,
      building.buildingId,
      building.buildingName,
      building.rooms,
      building.address
    );
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditBuildingDialogComponent, {
      width: '450px',
      data: {
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.notBlank(building.buildingName)) {
        if (this.checkBuildingUnique(building)) {
          this.updateBuilding(location, building);
        } else {
          this.updateBuilding(location, original);
          window.alert('That building already exists at this location');
        }
      } else {
        for (let buildingIndex = 0; buildingIndex < this.buildings.length; buildingIndex++) {
          if (this.buildings[buildingIndex].buildingId === building.buildingId) {
            this.buildings[buildingIndex] = original;
          }
        }
      }
    });
  }
  openEditRoomDialog(evt, location: Address, building: Building, room: Room): void {
    const original = new Room(room.id, room.active, room.roomName, room.building, room.unavailabilities);

    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationEditRoomDialogComponent, {
      width: '450px',
      data: {
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.notBlank(room.roomName)) {
        console.log('room(' + room.id + '): ' + room.roomName);
        console.log('original(' + original.id + '): ' + original.roomName);
        if (this.checkRoomUnique(room)) {
          console.log('updating because ' + room.roomName + ' is unique');
          this.updateRoom(location, building, room);
        } else {
          console.log(room.roomName + ' is not unique');
          this.updateRoom(location, building, original);
          window.alert('A room with the name you changed to already exists');
        }
      } else {
        this.updateRoom(location, building, original);
      }
    });
  }

  //Delete Dialogs
  openDeleteLocationDialog(evt, location: Address): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteLocationDialogComponent, {
      width: '250px',
      data: {
        location: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLocation(result);
      }
    });
  }
  openDeleteBuildingDialog(evt, location: Address, building: Building): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteBuildingDialogComponent, {
      width: '250px',
      data: {
        building: building
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBuilding(location, building);
      }
    });
  }
  openDeleteRoomDialog(evt, location: Address, building: Building, room: Room): void {
    evt.stopPropagation();
    const dialogRef = this.dialog.open(LocationDeleteRoomDialogComponent, {
      width: '250px',
      data: {
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRoom(location, building, room);
        this.loadRooms();
      }
    });
  }

  openEditUnavailibiliyDialog(evt, room: Room): void {
    const original = new Room(room.id, room.active, room.roomName, room.building, room.unavailabilities);

    evt.stopPropagation();

    const dialogRef = this.dialog.open(LocationOpenUnavailibilityDialogComponent, {
      width: '600 px',
      data: {
        room: room
      }
    });
  }

  // Alerts the user if name field is left blank in dialog submission
  notBlank(content: String) {
    if (content.replace(/\s/g, '').length === 0) {
      alert('Name field cannot be left blank');
      return false;
    } else {
      return true;
    }
  }

  checkRoomUnique(room: Room): boolean {
    let unique = true;
    //ask august how to postpone for asynchronous stuff
    //this.roomService.findAll().subscribe(result => {

    for (let item of this.rooms) {
      if (item.roomName === room.roomName && item.building === room.building && item.id !== room.id) {
        console.log('room(' + item.id + ') is the duplicate: ' + room.roomName);
        unique = false;
        break;
      }
    }
    return unique;
    //})
  }

  checkLocationUnique(address: Address): boolean {
    let unique = true;
    //ask august how to postpone for asynchronous stuff
    //this.roomService.findAll().subscribe(result => {

    for (let item of this.locations) {
      if (
        item.name === address.name &&
        item.id !== address.id &&
        item.city === address.city &&
        item.state === address.state
      ) {
        console.log('location(' + item.id + ') is the duplicate: ' + address.name);
        unique = false;
        break;
      }
    }
    return unique;
    //})
  }

  checkBuildingUnique(building: Building): boolean {
    let unique = true;
    //ask august how to postpone for asynchronous stuff
    //this.roomService.findAll().subscribe(result => {

    for (let item of this.buildings) {
      console.log(item);
      if (
        item.buildingName === building.buildingName &&
        item.address === building.address &&
        item.buildingId !== building.buildingId
      ) {
        console.log('building(' + item.buildingId + ') is the duplicate: ' + building.buildingName);
        unique = false;
        break;
      }
    }
    return unique;
    //})
  }
}
