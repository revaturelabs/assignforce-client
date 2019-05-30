/**
 * Batch model
 * A Batch consists of an id, name, start date, end date, curriculum, trainer, 
 * co-trainer, skills, location, building, room, and class size. 
 */
import { Skill } from "./Skill";
import { getMatScrollStrategyAlreadyAttachedError } from "@angular/cdk/overlay/typings/scroll/scroll-strategy";

export class Batch {
  id: number;
  name: string;
  startDate: number;
  endDate: number;
  curriculum: number;
  trainer: number;
  cotrainer: number;
  skills: Skill[];
  location: number;
  building: number;
  room: number;
  size: number;

  /**
   * Creates an instance of Batch.
   * @param {number} [id]
   * @param {string} [name]
   * @param {number} [startDate]
   * @param {number} [endDate]
   * @param {number} [curriculum]
   * @param {number} [trainer]
   * @param {number} [cotrainer]
   * @param {Skill[]} [skills]
   * @param {number} [location]
   * @param {number} [building]
   * @param {number} [room]
   * @param {number} [classSize]
   * @memberof Batch
   */
  constructor(
    id?: number,
    name?: string,
    startDate?: number,
    endDate?: number,
    curriculum?: number,
    trainer?: number,
    cotrainer?: number,
    skills?: Skill[],
    location?: number,
    building?: number,
    room?: number,
    classSize?: number
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.curriculum = curriculum;
    this.trainer = trainer;
    this.cotrainer = cotrainer;
    this.skills = skills;
    this.location = location;
    this.building = building;
    this.room = room;
    this.size = classSize;
  }
}
