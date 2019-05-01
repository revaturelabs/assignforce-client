import { Component, OnInit, Inject } from '@angular/core';
import { Unavailability } from '../../../model/Unavailability';
import { RoomControllerService } from '../../../services/api/room-controller/room-controller.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UnavailableControllerService } from '../../../services/api/unavailable-controller/unavailable-controller.service';
import { LocationAddUnavailabilityDialogComponent } from '../location-add-unavailability-dialog/location-add-unavailability-dialog.component';
import { Room } from '../../../model/Room';
import { LocationChangeUnavailabilityDialogComponent } from '../location-change-unavailability-dialog/location-change-unavailability-dialog.component';
import { LocationDeleteUnavailabilityDialogComponent } from '../location-delete-unavailability-dialog/location-delete-unavailability-dialog.component';

@Component({
  selector: 'app-location-open-unavailibility-dialog',
  templateUrl: './location-open-unavailibility.component.html'
})
export class LocationOpenUnavailibilityDialogComponent implements OnInit {
  unavailibilities: Unavailability[] = [];

  constructor(
    private roomService: RoomControllerService,
    public dialog: MatDialog,
    private unavailibilityService: UnavailableControllerService,
    public dialogRef: MatDialogRef<LocationOpenUnavailibilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
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
