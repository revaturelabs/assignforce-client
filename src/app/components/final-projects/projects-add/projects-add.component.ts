import { Component, OnInit, Inject } from '@angular/core';
import { FinalProject } from '../../../model/FinalProject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.css']
})
export class ProjectsAddComponent implements OnInit {

  project: FinalProject = {
    id: null,
    name: "",
    description: '',
    isActive: true
  }
    
  addProjectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProjectsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public dataP: any,
    private fb: FormBuilder
  ) {
    this.addProjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.addProjectForm.controls['name'].setValue(this.project.name);
    this.addProjectForm.controls['description'].setValue(this.project.description);

  }

  ngOnInit() {}

  onSubmit(value, valid) {
    if (valid) {
      this.project = Object.assign({}, this.project, value);
     
      this.dialogRef.close(this.project);
    }
  }

  onNoClick(evt): void {
    evt.preventDefault();
    this.dialogRef.close();
  }
}
