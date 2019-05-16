/**
 * Model for Focus
 */

import { Skill } from './Skill';

export class Focus {
  id: number;
  name: string;
  isActive: boolean;
  isCore: boolean;
  skills: Skill[];

  /**
   * Creates an instance of Focus.
   * @param {number} id
   * @param {string} name
   * @param {boolean} active
   * @param {boolean} core
   * @param {Skill[]} skills
   * @memberof Focus
   */
  constructor(id: number, name: string, active: boolean, core: boolean, skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.isActive = active;
    this.isCore = core;
    this.skills = skills;
  }
}
