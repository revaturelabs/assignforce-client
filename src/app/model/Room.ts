import { Unavailability } from './Unavailability';
import { Reservation } from './Reservation';

export class Room {
  id: number;
  roomName: string;
  building: number;
  active: boolean;
  unavailabilities: Unavailability[];
  reservations: Reservation[];
  capacity: number;

  constructor(id?: number, active?: boolean, roomName?: string, building?: number, unavailabilities?: Unavailability[]) {
    this.id = id;
    this.roomName = roomName;
    this.active = active;
    this.building = building;
    this.unavailabilities = unavailabilities;
  }
}
