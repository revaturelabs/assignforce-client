export class Event {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  createdDate: Date;
  room_id: number;

  constructor(id?: number, startDate?: Date, endDate?: Date, name?: string, createdDate?: Date, room_id?: number) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.name = name;
    this.createdDate = createdDate;
    this.room_id = room_id;
  }
}
