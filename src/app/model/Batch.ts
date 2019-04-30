import { Skill } from './Skill';

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
  classSize: number;

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
    this.classSize = classSize;
  }
}
