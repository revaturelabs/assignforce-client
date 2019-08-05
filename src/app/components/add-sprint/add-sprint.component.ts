import { Component, OnInit } from "@angular/core";
import {MatDialog} from "@angular/material";
import {Sprint} from "../../model/sprint";
import {SkillControllerService} from "../../services/api/skill-controller/skill-controller.service";
import {SprintControllerService} from "../../services/api/sprint-controller/sprint-controller.service";
import {AuthService} from "../../services/auth/auth.service";
import { getSupportedInputTypes } from "@angular/cdk/platform";

@Component({
  selector: "app-add-sprint",
  templateUrl: "./add-sprint.component.html",
  styleUrls: ["./add-sprint.component.css"],
})
export class AddSprintComponent implements OnInit {
  name: any;
  description: string;

  sprints: Sprint[];

  constructor(private sprintService: SprintControllerService,
              private dialog: MatDialog,
              private skillControllerService: SkillControllerService,
              public auth0: AuthService) { }

  // tslint:disable-next-line:one-line
 

  ngOnInit() {
  
      this.sprintService.getAll()
      .subscribe(sprints => {
        this.sprints = sprints;
      });
    }
  }


