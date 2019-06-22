import {Component, Output, EventEmitter, Input, SimpleChanges, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Room } from '../../model/Room';
import { Event } from '../../model/Event';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { Address } from '../../model/Address';
import { Building } from '../../model/Building';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { EventControllerService } from '../../services/api/event-controller/event-controller.service';
import { MatDialog } from '@angular/material';
import { RoomAddEventFormComponent } from './add-event-form/add-event-form.component';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

export interface RowSchedule {
  capacity: number;
  roomName: string;
  week: string[];
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-room-scheduler',
  templateUrl: './room-scheduler.component.html',
  styleUrls: ['./room-scheduler.component.css']
})
export class RoomSchedulerComponent implements OnInit{
  
  locations: Address[] = [];
  buildings: Building[] = [];
  rooms: Room[] = [];
  selectedLocation  = 0;
  filteredRooms: Room[] = [];

  weekDate: Date;
  columnsToDisplay: string[] = ['capacity', 'room', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  weekDateHeader: string[] = [];

  currentDate = moment();
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  events: Event[] = [];

  schedule: RowSchedule[] = [];

  dataSource = this.schedule;

  constructor (private locationService: AddressControllerService,
    private buildingService: BuildingControllerService,
    private roomService: RoomControllerService,
    private cachingService: CachedObjectsService,
    private eventService: EventControllerService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.loadLocations();
    this.loadBuildings();
    this.loadRooms();
    this.loadEvents();
  }

  renderEvents(weekChange: boolean) {
    for (let i = 0; i < this.filteredRooms.length; i++) {
      let weekEvents: string[] = [];
      
      let roomEvents: Event[] = this.eventsOfRoom(this.filteredRooms[i].id);

      weekEvents = this.thisWeekSchedule(roomEvents, this.filteredRooms[i]);
      
      if (weekChange) {
          this.schedule[i].week = weekEvents;
      } else {
        this.schedule.push({
          capacity: this.filteredRooms[i].capacity,
          roomName: this.filteredRooms[i].name,
          week: weekEvents
        })
      }
    }
  }


  locationChange(location) {
  this.selectedLocation = location;
    const buildings: Building[] = this.locationBuildings(location);
    this.filteredRooms = [];
    for (let i = 0; i < buildings.length; i++) {
      const rooms: Room[] = this.buildingRooms(buildings[i].id);
      for (let j = 0; j < rooms.length; j++) {
        this.filteredRooms.push(rooms[j]);
      }
    }
    this.renderEvents(false);
  }

  thisWeekSchedule(roomEvents: Event[], room: Room): string[] {
    const firstOfWeek = moment(this.currentDate).startOf('week');
    let result: string[] = ['free', 'free', 'free', 'free', 'free', 'free', 'free'];
    for (let j = 0; j < 7; j++) {
      const day = moment(firstOfWeek).add(j, 'days');
      this.weekDateHeader[j] = day.date().toString();
      for (let i = 0; i < roomEvents.length; i++) {
        const event: Event = roomEvents[i];
        if (moment(day).isSame(moment(event.startDate)) ||
         moment(day).isSame(moment(event.endDate)) ||
         moment(day).isBetween(moment(event.startDate), moment(event.endDate))) {
          result[j] = event.name;
        }
      }
    }
    return result;
  }

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
      for (const b of buildings) {
        if (b.id === null) {
          b.id = b.id;
          this.updateBuilding(this.locations[this.locations.findIndex(searchFor => searchFor.id === b.address)], b);
        }
      }
    });
  }

  loadRooms() {
    this.roomService.findAll().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  loadEvents() {
    this.eventService.findAll().subscribe((events) => {
      this.events = events;
    })
  }

  locationBuildings(id: number) {
    return this.buildings.filter(building => building.address === id);
  }

  buildingRooms(id: number): Room[] {
    return this.rooms.filter(rm => rm.building === id);
  }

  eventsOfRoom(id: number): Event[] {
    return this.events.filter(event => event.room === id);
  }

  updateBuilding(location: Address, building: Building) {
    const newLocation = location;
    for (let i = 0; i < newLocation.buildings.length; i++) {
      if (newLocation.buildings[i].id === building.id) {
        newLocation.buildings[i] = building;
        break;
      }
    }
    this.buildingService
      .update(building)
      .toPromise()
      .then(() => {
        this.loadBuildings();
      });
  }

  // Date checkers

  isToday(date: moment.Moment) {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment) {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment) {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate) {
    this.onSelectDate.emit(date);
  }

  // Actions from Calendar

  prevWeek() {
    this.currentDate = moment(this.currentDate).subtract(1, 'weeks');
    this.renderEvents(true);
  }

  nextWeek() {
    this.currentDate = moment(this.currentDate).add(1, 'weeks');
    this.renderEvents(true);
  }

  prevMonth() {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.renderEvents(true);
  }

  nextMonth() {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.renderEvents(true);
  }

  firstWeek() {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.renderEvents(true);
  }

  lastWeek() {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.renderEvents(true);
  }

  prevYear() {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.renderEvents(true);
  }

  nextYear() {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.renderEvents(true);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoomAddEventFormComponent, {
      width: '250px',
      data: {
        location: this.selectedLocation,
        rooms: this.filteredRooms
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  cancel() {
    this.dialog.closeAll();
  }
}
