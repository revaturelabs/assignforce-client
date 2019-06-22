import { Unavailability } from './Unavailability';
import { Reservation } from './Reservation';

export class Room {
  id: number;
  name: string;
  building: number;
  active: boolean;
  unavailabilities: Unavailability[];
  capacity: number;

  constructor(id?: number, active?: boolean, roomName?: string, building?: number, unavailabilities?: Unavailability[], capacity?: number) {
    this.id = id;
    this.name = roomName;
    this.active = active;
    this.building = building;
    this.unavailabilities = unavailabilities;
    this.capacity = capacity;
  }
}
