import { Room } from './Room';
import { Batch } from './Batch';

export class Event {
    id: number;
    startDate: Date;
    endDate: Date;
    room: Room;
    batch: Batch;
    description: String;

    constructor(id?: number, startDate: Date, endDate: Date, room: Room, batch: Batch, description?: String) { 
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.room = room;
        this.batch = batch;
        this.description = description;
    }
}

