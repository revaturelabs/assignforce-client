import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-curriculum-skills',
  templateUrl: './curriculum-skills.component.html',
  styleUrls: ['./curriculum-skills.component.css']
})
export class CurriculumSkillsComponent implements OnInit {
  skillData: Skill[] = [];

  constructor(
    private dialog: MatDialog,
    private skillControllerService: SkillControllerService,
    public auth0: AuthService
  ) {}

  ngOnInit() {
    this.skillControllerService.findAll().subscribe(data => {
      this.skillData = data;
    });
  }

  checkAuth() {
    return this.auth0.userHasRole(['SVP of Technology']);
  }

  openAddSkillDialog(event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddSkillComponent, {
      data: this.skillData
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshSkills();
    });
  }

  openEditSkillDialog(skill) {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      data: skill
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshSkills();
    });
  }

  refreshSkills(): void {
    this.skillControllerService
      .findAll()
      .toPromise()
      .then(data => {
        this.skillData = data;
      });
  }

  confirmRemoveSkill(skill: Skill) {
    if (confirm('Are you sure you want to remove ' + skill.skillName + '?')) {
      skill.isActive = false;
      this.skillControllerService
        .update(skill)
        .toPromise()
        .then(() => {
          this.refreshSkills();
        })
        .catch(err => {
          alert('Error occurred while removing skill');
          console.log(err);
        });
    }
  }
}
