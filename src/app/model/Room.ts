import { Unavailability } from './Unavailability';
import { Event } from './Event';

export class Room {
  id: number;
  roomName: string;
  building: number;
  active: boolean;
  unavailabilities: Unavailability[];
  events: Event[];
  capacity: number;

  constructor(
    id?: number,
    active?: boolean,
    roomName?: string,
    building?: number,
    unavailabilities?: Unavailability[]
  ) {
    this.id = id;
    this.roomName = roomName;
    this.active = active;
    this.building = building;
    this.unavailabilities = unavailabilities;
  }
}
