import { Unavailability } from './Unavailability';
import { Skill } from './Skill';

export class Trainer {
  id: number;
  firstName: string;
  lastName: string;
  skills: Skill[];
  certifications: any[];
  isActive: boolean;
  resume: any;
  preferredLocation: number;
  unavailabilities: Unavailability[];
  email: string;
  linkedInUrl: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    skills: Skill[],
    certifications: any[],
    isActive: boolean,
    resume: any,
    unavailabilities: Unavailability[],
    email: string,
    preferredLocation: number,
    linkedInUrl: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.skills = skills;
    this.certifications = certifications;
    this.isActive = isActive;
    this.resume = resume;
    this.unavailabilities = unavailabilities;
    this.email = email;
    this.preferredLocation = preferredLocation;
    this.linkedInUrl = linkedInUrl;
  }
}
