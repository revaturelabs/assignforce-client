import { Room } from "./Room";
export class Unavailability {
  id: number;
  startDate: Date;
  endDate: Date;
  description: string;
  room: number;

  constructor(id?: number, startDate?: Date, endDate?: Date, description?: string, room?: number) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.room = room;
  }
}
