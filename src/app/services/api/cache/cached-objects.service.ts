import { Injectable } from '@angular/core';
import { Trainer } from '../../../model/Trainer';
import { Batch } from '../../../model/Batch';
import { Focus } from '../../../model/Focus';
import { Skill } from '../../../model/Skill';
import { Curriculum } from '../../../model/Curriculum';
import { Address } from '../../../model/Address';
import { FinalProject } from '../../../model/FinalProject';

/**
 * This service is used to store information from the database, so that once a call is done once,
 * the same call is not performed on other tabs.  Every array has a getter and setter.
 */
@Injectable()
export class CachedObjectsService {

  constructor() { }

  private cachedTrainers: Trainer[] = [];
  private cachedBatches: Batch[] = [];
  private cachedFocuses: Focus[] = [];
  private cachedSkills: Skill[] = [];
  private cachedLocations: Address[] = [];
  private cachedCurriculum: Curriculum[] = [];
  private cachedFinalProjects: FinalProject[] = []

  public getTrainers():Trainer[]{
    return this.cachedTrainers;
  }

  public setTrainers(trainers: Trainer[]){
    this.cachedTrainers = trainers;
  }

  public getBatches():Batch[]{
    return this.cachedBatches;
  }

  public setBatches(batches: Batch[]){
    this.cachedBatches = batches;
  }

  public getFocuses():Focus[]{
    return this.cachedFocuses;
  }

  public setFocuses(focuses: Focus[]){
    this.cachedFocuses = focuses;
  }

  public getSkills():Skill[]{
    return this.cachedSkills;
  }

  public setSkills(skills: Skill[]){
    this.cachedSkills = skills;
  }

  public getLocations():Address[]{
    return this.cachedLocations;
  }

  public setLocations(locations: Address[]){
    this.cachedLocations = locations;
  }

  public getCurricula():Curriculum[]{
    return this.cachedCurriculum;
  }

  public setCurricula(curriculum: Curriculum[]){
    this.cachedCurriculum = curriculum;
  }

  public getFinalProjects(): FinalProject[]{
    return this.cachedFinalProjects;
  }
  
  public setFinalProjects(finalProject: FinalProject[]){
    this.cachedFinalProjects = finalProject;
  }

}
