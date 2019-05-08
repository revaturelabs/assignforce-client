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

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

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

  currentDate = moment();
  //dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  room: Room = new Room(2, true, 'Room325', 32, []);
  room2: Room = new Room(2, true, 'Room2', 32, []);

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  events: Event[] = [];

  schedule: RowSchedule[] = [];

  dataSource = this.schedule;

  constructor (private locationService: AddressControllerService,
    private buildingService: BuildingControllerService,
    private roomService: RoomControllerService,
    private cachingService: CachedObjectsService
    ) { }

  ngOnInit(): void {
    this.loadLocations();
    this.loadBuildings();
    this.loadRooms();

    //this.generateSchedule();
  }

  locationChange(location) {
    this.selectedLocation = location;
    const buildings: Building[] = this.locationBuildings(location);
    this.filteredRooms = [];
    console.log(buildings);
    for (let i = 0; i < buildings.length; i++) {
      console.log('building id is ' + buildings[i].buildingId);
      const rooms: Room[] = this.buildingRooms(buildings[i].buildingId);
      for (let j = 0; j < rooms.length; j++) {
        this.filteredRooms.push(rooms[j]);
      }
    }
    this.renderEvents();
  }

  renderEvents() {
    for (let i = 0; i < this.filteredRooms.length; i++) {
      let weekEvents: string[] = [];
      
      let roomEvents: Event[] = this.eventsOfRoom(this.filteredRooms[i].id);

      weekEvents = this.thisWeekSchedule(roomEvents, this.filteredRooms[i]);
      
      this.schedule.push({
        capacity: this.filteredRooms[i].capacity,
        roomName: this.filteredRooms[i].roomName,
        week: weekEvents
      })
    }
  }

  thisWeekSchedule(roomEvents: Event[], room: Room): string[] {
    const firstOfWeek = moment(this.currentDate).startOf('week');
    let result: string[] = ['free', 'free', 'free', 'free', 'free', 'free', 'free'];
    for (let j = 0; j < 7; j++) {
      const day = moment(firstOfWeek).add(j, 'days');
      for (let i = 0; i < roomEvents.length; i++) {
        const event: Event = roomEvents[i];
        if (moment(day).isBetween(moment(event.startDate), moment(event.endDate))) {
          result[i] = room.roomName;
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
        if (b.buildingId === null) {
          b.buildingId = b.id;
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
      if (newLocation.buildings[i].buildingId === building.buildingId) {
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

  renderRows() {
    const event1: Event = new Event(1, new Date(2019, 3, 4), new Date(2019, 5, 10), 'Room 7392', 1);
    const event2: Event = new Event(2, new Date(2019, 3, 4), new Date(2019, 5, 10), 'Room 3242', 2);
    this.events.push(event1);
    this.events.push(event2);
  }

  generateSchedule() {
    
  }

  

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1) {
        this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
        this.generateSchedule();
      }
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
    this.renderEvents();
  }

  nextWeek() {
    this.currentDate = moment(this.currentDate).add(1, 'weeks');
    this.renderEvents();
  }

  prevMonth() {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.renderEvents();
  }

  nextMonth() {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.renderEvents();
  }

  firstWeek() {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.renderEvents();
  }

  lastWeek() {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.renderEvents();
  }

  prevYear() {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.renderEvents();
  }

  nextYear() {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.renderEvents();
  }

  // generate the calendar grid

  // generateCalender() {
  //   const dates = this.fillDates(this.currentDate);
  //   const weeks: CalendarDate[][] = [];
  //   while (dates.length > 0) {
  //     weeks.push(dates.splice(0, 7));
  //   }
  //   this.weeks = weeks;
  // }

  // fillDates(currentMoment: moment.Moment) {
  //   const firstOfMonth = moment(currentMoment).startOf('month').date();
  //   const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
  //   const start = firstDayOfGrid.date();
  //   return _.range(start, start + 42)
  //         .map((date: number): CalendarDate => {
  //           const d = moment(firstDayOfGrid).date(date);
  //           return {
  //             today: this.isToday(d),
  //             selected: this.isSelected(d),
  //             mDate: d,
  //           };
  //         });
  // }
}
