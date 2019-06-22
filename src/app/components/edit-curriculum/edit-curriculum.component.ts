import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { Curriculum } from '../../model/Curriculum';
import { Skill } from '../../model/Skill';

@Component({
  selector: 'app-edit-curriculum',
  templateUrl: './edit-curriculum.component.html',
  styleUrls: ['./edit-curriculum.component.css']
})

/**
 * NOTE: When testing the curriculumControllerService's update method on the LOCAL ENVIRONMENT,
 * the JSON server will expect to see the PUT request to be '.../curriculum/:id'
 * ...whereas the backend will not expect the trailing id but will receive the object
 * in the body of the put request and use its ID to perform the update
 */
export class EditCurriculumComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditCurriculumComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data,
    private skillControllerService: SkillControllerService,
    private curriculumControllerService: CurriculumControllerService
  ) {}

  //The curriculum editing, with default values
  curriculum: Curriculum = {
    id: 0,
    name: '',
    skills: [],
    isActive: true,
    isCore: true
  };

  //array of available skills
  skills: Skill[] = [];

  //The array of selected skills
  selectedSkills: Skill[] = [];

  //Sets up the modal with all the data it will need to occomplish its task.
  ngOnInit() {
    this.skillControllerService.findAll().subscribe(allSkills => {
      this.skills = allSkills;
      this.curriculum = {...this.data.curriculumData};  //spread operator, creates new object so doesn't reference original
      this.selectedSkills = this.curriculum.skills;
    });
  }

  //Closes the Modal
  closeDialog() {
    this.dialogRef.close();
  }

  //Compares the skills so that you can see what already exists in the object in the select
  compareFunction(skill, skill2) {
    return skill.id === skill2.id;
  }

  //Resets the curriculum object so that we don't have undefined issues when loading a page
  newCurriculum(): void {
    this.curriculum = new Curriculum(0, '', true, true, []);
  }

  //Sends the updated curriculum to the backend to be processed
  editCurriculum(): void {
    this.curriculum.skills = this.selectedSkills;
    this.curriculumControllerService
      .update(this.curriculum)
      .toPromise()
      .then()
      .catch(err => {
        alert('Error occurred while editing curriculum');
        console.log(err);
      });
    this.newCurriculum();
    this.closeDialog();
  }
}
