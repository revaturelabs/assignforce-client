/**
 * Add Curriculum Component
 *
 * @author August Duet
 *  */

import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "../../../../node_modules/@angular/material";
import { Curriculum } from "../../model/Curriculum";
import { Skill } from "../../model/Skill";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";

@Component({
  selector: "app-add-curriculum",
  templateUrl: "./add-curriculum.component.html",
  styleUrls: ["./add-curriculum.component.css"],
})
export class AddCurriculumComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCurriculumComponent>,
    private curriculumControllerService: CurriculumControllerService,
    private skillControllerService: SkillControllerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  curriculum: Curriculum;
  skills: Skill[] = [];
  selectedSkills: Skill[];

  ngOnInit() {
    this.newCurriculum();
    this.skillControllerService.findAll().subscribe((data) => {
      this.skills = data.filter((skill) => {
        // tslint:disable-next-line:one-line
        if (skill.isActive){
          return skill;
        }
      });
    });
  }

  /**
   * Closes the add curriculum modal
   *
   * @memberof AddCurriculumComponent
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Resets the current curriculum.
   * This is here to prevent the old curriculum from persisting between additions and to prevent undefined errors.
   *
   * @memberof AddCurriculumComponent
   */
  newCurriculum(): void {
    this.curriculum = new Curriculum(0, "", true, true, []);
  }

  /**
   * Handler for "Add curriculum" button from form.
   * Calls the create method of the curriculum controller service.
   *
   * @memberof AddCurriculumComponent
   */
  addCurriculum(): void {
    this.curriculum.skills = this.selectedSkills;
    this.curriculum.isCore = this.data.isCore;
    this.curriculumControllerService
      .create(this.curriculum)
      .toPromise()
      .then(() => {
        this.newCurriculum();
        this.closeDialog();
      })
      .catch((err) => {
        alert("Error occurred while adding Curriculum");
        console.log(err);
      });
  }
}
