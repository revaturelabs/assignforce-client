import { Component, OnInit, Input } from '@angular/core';

import { Trainer } from '../../../model/Trainer';
import { Skill } from '../../../model/Skill';
import { TrainerControllerService } from '../../../services/api/trainer-controller/trainer-controller.service';
import { SkillControllerService } from '../../../services/api/skill-controller/skill-controller.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CachedObjectsService } from '../../../services/api/cache/cached-objects.service';
import { RouterLink } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-trainer-item',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.css']
})
export class TrainerItemComponent implements OnInit {
  @Input()
  trainer: Trainer;
  isManager: boolean;
  allSkills: Skill[] = [];
  routerLink: RouterLink;
  @Input() skills: Skill[] = [];

  constructor(
    private trainerService: TrainerControllerService,
    private skillsService: SkillControllerService,
    public auth0: AuthService,
    private cachingService: CachedObjectsService
  ) {}

  ngOnInit() {
    this.isManager = this.auth0.userHasRole(['SVP of Technology']);
  }
  ngOnChanges() {
    this.allSkills = this.skills;
    this.cachingService.setSkills(this.skills);
  }

  removeTrainer() {
    this.trainer.isActive = false;
    this.trainerService
      .update(this.trainer)
      .toPromise()
      .then(t => {})
      .catch(error => {
        console.log(error);
      });
  }

  activateTrainer() {
    this.trainer.isActive = true;
    this.trainerService
      .update(this.trainer)
      .toPromise()
      .then(t => {})
      .catch(error => {
        console.log(error);
      });
  }

  listSkills() {
    if (!this.trainer.skills || this.trainer.skills.length === 0) {
      return 'None';
    }
    const skillName: string[] = [];
    const skillsArray = this.allSkills.filter(aSkill => {
      if (this.trainer.skills) {
        return this.trainer.skills.findIndex(tSkill => {
          return aSkill.id === tSkill.id;
        }) >= 0;
      }
      return false;
    });
    return skillsArray.map(skill => skill.name).join(', ');

    // for (const skill of this.trainer.skills) {
    //   // console.log(skill);
    //   if (skill) {
    //     name.push(' ' + skill.name);
    //   } else {
    //     name.push('skillErr!');
    //   }
    // }
    // return name;
  }
}
