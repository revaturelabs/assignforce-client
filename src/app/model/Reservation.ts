/**
 * Model for Reservation
 */

export class Reservation {
    id: number;
    startDate: Date;
    endDate: Date;
    description: string;
    room: number;
    batch: number;

    /**
     * Creates an instance of Reservation.
     * @param {number} [id]
     * @param {Date} [startDate]
     * @param {Date} [endDate]
     * @param {string} [description]
     * @param {number} [room]
     * @param {number} [batch]
     * @memberof Reservation
     */
    constructor(id?: number, startDate?: Date, endDate?: Date, description?: string, room?: number, batch?: number) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.room = room;
        this.batch = batch;
    }
}