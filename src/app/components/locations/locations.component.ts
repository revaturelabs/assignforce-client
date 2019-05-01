import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Building } from '../../model/Building';
import { Address } from '../../model/Address';
import { Room } from '../../model/Room';
import { LocationAddDialogComponent } from './add-dialog/location-add-dialog.component';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { AuthService } from '../../services/auth/auth.service';

import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { LocationAddLocationDialogComponent } from './location-add-location-dialog/location-add-location-dialog.component';
import { LocationAddRoomDialogComponent } from './location-add-room-dialog/location-add-room-dialog.component';
import { LocationEditLocationDialogComponent } from './location-edit-location-dialog/location-edit-location-dialog.component';
import { LocationEditBuildingDialogComponent } from './location-edit-building-dialog/location-edit-building-dialog.component';
import { LocationEditRoomDialogComponent } from './location-edit-room-dialog/location-edit-room-dialog.component';
import { LocationDeleteLocationDialogComponent } from './location-delete-location-dialog/location-delete-location-dialog.component';
import { LocationDeleteBuildingDialogComponent } from './location-delete-building-dialog/location-delete-building-dialog.component';
import { LocationDeleteRoomDialogComponent } from './location-delete-room-dialog/location-delete-room-dialog.component';
import { LocationOpenUnavailibilityDialogComponent } from './location-open-unavailibility/location-open-unavailibility.component';

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
    this.roomService
      .update(room)
      .subscribe(resp => this.loadRooms());
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
    for (let item of this.rooms) {
      if (item.roomName === room.roomName && item.building === room.building && item.id !== room.id) {
        console.log('room(' + item.id + ') is the duplicate: ' + room.roomName);
        unique = false;
        break;
      }
    }
    return unique;
  }

  checkLocationUnique(address: Address): boolean {
    let unique = true;
    //ask august how to postpone for asynchronous stuff

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
  }

  checkBuildingUnique(building: Building): boolean {
    let unique = true;
    //ask august how to postpone for asynchronous stuff

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
  }
}
