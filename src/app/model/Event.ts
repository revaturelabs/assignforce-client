export class Event {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
    created: Date;
    room: number;

    constructor(id?: number, startDate?: Date, endDate?: Date, name?: string, created?: Date,room?: number) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.name = name;
        this.created = created;
        this.room = room;
    }
}