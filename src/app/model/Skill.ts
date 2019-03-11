export class Skill {
  skillId: number;
  skillName: string;
  isActive: boolean;

  constructor(id: number, name: string, active: boolean) {
    this.skillId = id;
    this.skillName = name;
    this.isActive = active;
  }
}
