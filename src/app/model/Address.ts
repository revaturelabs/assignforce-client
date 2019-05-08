/**
 * This class represents the model for an Address
 * 
 */

import { Building } from './Building';

export class Address {
  public id: number;
  name: string;
  city: string;
  state: string;
  buildings: Building[];
  isActive: boolean;

  /**
   * Creates an instance of Address.
   * @param {number} [id]
   * @param {string} [name]
   * @param {string} [city]
   * @param {string} [state]
   * @param {Building[]} [buildings]
   * @param {boolean} [isActive]
   * @memberof Address
   */
  constructor(id?: number, name?: string, city?: string, state?: string, buildings?: Building[], isActive?: boolean) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.state = state;
    this.buildings = buildings;
    this.isActive = isActive;
  }
}
