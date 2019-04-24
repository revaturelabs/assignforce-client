import { Skill } from './Skill';

export class Curriculum {
  id: number;
  name: string;
  isActive: boolean;
  isCore: boolean;
  skills: Skill[];

  constructor(id: number, name: string, active: boolean, core: boolean, skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.isActive = active;
    this.isCore = core;
    this.skills = skills;
  }
}
