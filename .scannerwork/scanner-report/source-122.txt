import { Building } from './Building';

export class Address {
  public id: number;
  name: string;
  city: string;
  state: string;
  buildings: Building[];
  isActive: boolean;

  constructor(id?: number, name?: string, city?: string, state?: string, buildings?: Building[], isActive?: boolean) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.state = state;
    this.buildings = buildings;
    this.isActive = isActive;
  }
}
