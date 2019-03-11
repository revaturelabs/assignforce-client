import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Trainer } from '../../../model/Trainer';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-trainers-add',
  templateUrl: './trainers-add.component.html',
  styleUrls: ['./trainers-add.component.css']
})
export class TrainersAddComponent implements OnInit {
  trainer: Trainer = {
    id: null,
    firstName: '',
    lastName: '',
    isActive: true,
    preferredLocation: null,
    unavailabilities: [],
    email: '',
    skills: [],
    certifications: [],
    resume: '',
    linkedInUrl: ''
  };
  curricula = [];

  addTrainerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TrainersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public dataP: any,
    private fb: FormBuilder
  ) {
    this.addTrainerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      skills: this.fb.array([])
    });

    this.addTrainerForm.controls['firstName'].setValue(this.trainer.firstName);
    this.addTrainerForm.controls['lastName'].setValue(this.trainer.lastName);
    this.addTrainerForm.controls['email'].setValue(this.trainer.email);

    this.curricula = Array.from(dataP.curricula);
    this.curricula.sort((a, b) => a.id - b.id);
  }

  get skills() {
    return (this.addTrainerForm.get('skills') as FormArray).controls;
  }

  skillChange(checked, value) {
    if (checked) {
      //get the current values from the form
      const currentSkills = this.skills.map(control => control.value);

      // merge current skills with new skills
      const skills = currentSkills.concat(this.curricula.find(c => c.id === value).skills);

      const controls = skills.map(unique => this.fb.control(unique));
      const formControls = this.addTrainerForm.get('skills') as FormArray;

      while (formControls.length !== 0) {
        formControls.removeAt(0);
      }
      controls.forEach(control => (this.addTrainerForm.get('skills') as FormArray).push(control));
    } else {
      //remove
      const currentSkills = this.skills.map(control => control.value);
      const curriculumSkills = this.curricula.find(c => c.id === value).skills;

      // the current skills will contain all skills that were added
      // including dupes we can remove the first instance of the skill id
      for (let i = 0; i < curriculumSkills.length; i++) {
        currentSkills.splice(currentSkills.findIndex(c => c === curriculumSkills[i]), 1);
      }

      const controls = currentSkills.map(unique => this.fb.control(unique));
      const formControls = this.addTrainerForm.get('skills') as FormArray;

      while (formControls.length !== 0) {
        formControls.removeAt(0);
      }
      controls.forEach(control => (this.addTrainerForm.get('skills') as FormArray).push(control));
    }
  }

  ngOnInit() {}

  onSubmit(value, valid) {
    if (valid) {
      this.trainer = Object.assign({}, this.trainer, value);
     
      // remove dupes from trainer skills
      const uniques = [];

      for (let i = 0; i < this.trainer.skills.length; i++) {
        if (uniques.indexOf(this.trainer.skills[i]) === -1) {
          uniques.push(this.trainer.skills[i]);
        }
      }

      this.trainer.skills = uniques;

      this.dialogRef.close(this.trainer);
    }
  }

  onNoClick(evt): void {
    evt.preventDefault();
    this.dialogRef.close();
  }
}
