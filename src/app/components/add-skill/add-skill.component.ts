import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddSkillComponent>,
    private skillControllerService: SkillControllerService
  ) {}

  //The skill to be added.
  skill: Skill;

  //Makes sure that the skill is defined so that we may bind its properties.
  ngOnInit() {
    this.newSkill();
  }

  /**
   * Closes the Add Skill Modal
   *
   * @memberof AddSkillComponent
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Resets the skill so that old data wont exist on new Modal opening.  Also makes sure that there aren't any undefined issues. 
   *
   * @memberof AddSkillComponent
   */
  newSkill(): void {
    this.skill = new Skill(0, '', true);
  }

  /**
   * Handler for the add skill button from the form. 
   * Sends the new skill to be added to the server for processing. 
   *
   * @memberof AddSkillComponent
   */
  addSkill(): void {
    this.skillControllerService
      .create(this.skill)
      .toPromise()
      .then(() => {
        this.newSkill();
        this.closeDialog();
      })
      .catch(err => {
        alert('Error occurred while adding Skill');
        console.log(err);
      });
  }
}
