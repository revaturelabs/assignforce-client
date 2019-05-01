export class Reservation {
    id: number;
    startDate: Date;
    endDate: Date;
    description: string;
    room: number;
    batch: number;

    constructor(id?: number, startDate?: Date, endDate?: Date, description?: string, room?: number, batch?: number) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.room = room;
        this.batch = batch;
    }
}