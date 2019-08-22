import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {Sprint} from "../../model/sprint";
import {FinalProjectControllerService} from "../../services/api/final-project-controller/final-project-controller.service";
import {SkillControllerService} from "../../services/api/skill-controller/skill-controller.service";
import {SprintControllerService} from "../../services/api/sprint-controller/sprint-controller.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: "app-add-sprint",
  templateUrl: "./add-sprint.component.html",
  styleUrls: ["./add-sprint.component.css"],
})
export class AddSprintComponent implements OnInit {

  sprints: Sprint[];
  isLoading: boolean;
  projectName: string;

  constructor(private sprintService: SprintControllerService,
              private finalProjectService: FinalProjectControllerService,
              private dialog: MatDialog,
              private skillControllerService: SkillControllerService,
              public auth0: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  // tslint:disable-next-line:one-line

  ngOnInit() {
      this.isLoading = true;

      this.route.paramMap.subscribe((params) => {
        this.projectName = params.get("name");
        this.sprintService.getAll(this.projectName)
          .subscribe((sprints) => {
            this.sprints = sprints;
            this.isLoading = false;
          });
      });
  }

    createSprint(ProjectId) {
      /* not implemented */
    }
}
