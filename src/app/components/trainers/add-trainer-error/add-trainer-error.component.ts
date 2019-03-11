import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-add-trainer-error',
  templateUrl: './add-trainer-error.component.html',
  styleUrls: ['./add-trainer-error.component.css']
})
//Gives an error if a trainer is added when an existing trainer with the same email is already there
export class AddTrainerErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTrainerErrorComponent>) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
