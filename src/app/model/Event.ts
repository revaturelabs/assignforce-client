/**
 * Model for Event
 */
export class Event {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
    created: Date;
    room: number;

    /**
     * Creates an instance of Event.
     * @param {number} [id]
     * @param {Date} [startDate]
     * @param {Date} [endDate]
     * @param {string} [name]
     * @param {Date} [created]
     * @param {number} [room]
     * @memberof Event
     */
    constructor(id?: number, startDate?: Date, endDate?: Date, name?: string, created?: Date,room?: number) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.name = name;
        this.created = created;
        this.room = room;
    }
}