import { Unavailability } from './Unavailability';
import { Building } from './Building';
export class Room {
  id: number;
  roomName: string;
  building: number;
  active: boolean;
  unavailabilities: Unavailability[];

  constructor(id?: number, active?: boolean, roomName?: string, building?: number, unavailabilities?: Unavailability[]) {
    this.id = id;
    this.roomName = roomName;
    this.active = active;
    this.building = building;
    this.unavailabilities = unavailabilities;
  }
}
