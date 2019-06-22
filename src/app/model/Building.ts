/**
 * Model for Building
 */

import { Room } from './Room';
import { Address } from './Address';

export class Building {
  isActive: boolean;
  id: number;
  name: string;
  rooms: Room[];
  address: number;

  // this is to make the local server implementation work.
  // this *needs* to be tested with the proper back end
  localServerId: number;

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
    this.id = id;
    this.name = buildingName;
    this.rooms = rooms;
    this.address = address;
    this.localServerId = id;
  }
}
