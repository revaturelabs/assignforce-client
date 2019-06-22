export class Skill {
  id: number;
  name: string;
  isActive: boolean;

  constructor(id: number, name: string, active: boolean) {
    this.id = id;
    this.name = name;
    this.isActive = active;
  }
}
