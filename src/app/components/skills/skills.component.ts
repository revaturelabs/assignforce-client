import {
  Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  AfterViewChecked,
  OnChanges,
  EventEmitter
} from '@angular/core';

import { Skill } from '../../model/Skill';
import { Trainer } from '../../model/Trainer';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnChanges {
  lockSkills = true;
  disabled = true;
  skillsList: Skill[] = null;
  allSkills: Skill[] = [];
  skill: Skill;
  @Input()
  trainer: Trainer;
  @Input()
  editable: boolean;
  loading: boolean;
  @Output()
  skillsUpdated: EventEmitter<Trainer> = new EventEmitter<Trainer>();

  constructor(
    private skillService: SkillControllerService,
    private trainerService: TrainerControllerService,
    private http: HttpClient,
    public auth0: AuthService,
    private cacheService: CachedObjectsService
  ) {}

  ngOnInit() {
    this.getAllSkills();
  }

  ngOnChanges(changes) {
    if (changes.trainer) {
      this.trainer = Object.assign({}, changes.trainer.currentValue);
    }
  }

  trainerSkills(): Skill[] {
    const skills = [];
    if (!this.trainer || !this.trainer.skills || !this.allSkills) {
      return skills;
    }

    this.trainer.skills.forEach((tSkill, ind) => {
      skills[ind] = this.allSkills.filter(skill => skill.id === tSkill.id)[0];
    });
    return skills;
  }

  updateSkills() {
    this.lockSkills = !this.lockSkills;
    if (this.lockSkills) {
      this.skillsUpdated.emit(this.trainer);
      this.trainerService.update(this.trainer).subscribe();
    }
  }

  // add a skill to the current trainer
  addSkill(skill) {
    if (!this.trainer.skills.some(tSkill => skill.id === tSkill.id)) {
      this.trainer.skills.push(<any>{ skillId: skill.id });
    } else {
      this.removeSkill(skill)
    }
  }

  // remove a trainer skill on the bottom
  removeSkill(skill) {
    this.trainer.skills = this.trainer.skills.filter(tSkill => skill.id !== tSkill.id);
  }

  // grab all the skills and create a skill list
  getAllSkills() {
    this.skillsList = this.cacheService.getSkills();
    this.loading = true;
    if (this.skillsList == null) {
      //Already loaded skills from the cache, no need to reload
      this.loading = false;
    } else {
      this.skillService
        .findAll()
        .toPromise()
        .then(response => {
          this.loading = false;
          this.allSkills = response;
          this.cacheService.setSkills(response);
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
}
