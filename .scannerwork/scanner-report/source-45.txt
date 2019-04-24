import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private skillControllerService: SkillControllerService
  ) {}

  //The skill to be edited
  skill: Skill;

  //Sets up the Modal with all the data it will need
  ngOnInit() {
    this.newSkill();
    this.skill = JSON.parse(JSON.stringify(this.data));
  }

  //Closes the Modal
  closeDialog() {
    this.dialogRef.close();
  }

  //Resets the skill to avoid having undefined errors
  newSkill(): void {
    this.skill = new Skill(0, '', true);
  }

  //Sends the updated skill to the server to be processed.
  editSkill(): void {
    this.skillControllerService
      .update(this.skill)
      .toPromise()
      .then()
      .catch(err => {
        alert('Error occurred while editing skill');
        console.log(err);
      });
    this.newSkill();
    this.closeDialog();
  }
}
