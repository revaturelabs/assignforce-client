import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {Sprint} from "../../model/sprint";
import {SkillControllerService} from "../../services/api/skill-controller/skill-controller.service";
import {SprintControllerService} from "../../services/api/sprint-controller/sprint-controller.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: "app-add-sprint",
  templateUrl: "./add-sprint.component.html",
  styleUrls: ["./add-sprint.component.css"],
})
export class AddSprintComponent implements OnInit {
  name: any;
  description: string;

  sprints: Sprint[];
  isLoading: boolean;
  projectID: number;

  constructor(private sprintService: SprintControllerService,
              private dialog: MatDialog,
              private skillControllerService: SkillControllerService,
              public auth0: AuthService,
              private route: ActivatedRoute) { }

  // tslint:disable-next-line:one-line

  ngOnInit() {
      this.isLoading = true;
      this.sprintService.getAll()
      .subscribe((sprints) => {
        this.sprints = [];
        for (const sprint of sprints) {
          try {
            const body = JSON.parse(sprint.body);
            if (body.finalProject) {
              sprint.body = body;
              this.sprints.push(sprint);
            }
          } catch (e) {
            // invalid json, project is not a project sprint.
          }
        }
        this.isLoading = false;
      });

      this.route.params.subscribe((params) => {
        this.projectID = +params["id"]; // (+) converts string 'id' to a number

        // In a real app: dispatch action to load the details here.
      });
    }

    createSprint(ProjectId) {
      this.sprintService.createSprint("$ProjectSprint", '{"finalProject":' + ProjectId + "}");
    }
  }
