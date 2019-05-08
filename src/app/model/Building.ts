/**
 * Model for Building
 * 
 */

import { Room } from './Room';
import { Address } from './Address';

export class Building {
  isActive: boolean;
  buildingId: number;
  buildingName: string;
  rooms: Room[];
  address: number;

  // this is to make the local server implementation work.
  // this *needs* to be tested with the proper back end
  
  id: number;

  /**
   * Creates an instance of Building.
   * @param {boolean} isActive
   * @param {number} id
   * @param {string} buildingName
   * @param {Room[]} rooms
   * @param {number} address
   * @memberof Building
   */
  constructor(isActive: boolean, id: number, buildingName: string, rooms: Room[], address: number) {
    this.isActive = isActive;
    this.buildingId = id;
    this.buildingName = buildingName;
    this.rooms = rooms;
    this.address = address;
    this.id = id;
  }
}
