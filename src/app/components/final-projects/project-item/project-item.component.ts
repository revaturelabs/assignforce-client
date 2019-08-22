import { Component, Input, OnInit } from "@angular/core";
import { FinalProject } from "../../../model/FinalProject";
import { CachedObjectsService } from "../../../services/api/cache/cached-objects.service";
import { FinalProjectControllerService } from "../../../services/api/final-project-controller/final-project-controller.service";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-project-item",
  templateUrl: "./project-item.component.html",
  styleUrls: ["./project-item.component.css"],
})
export class ProjectItemComponent implements OnInit {
  @Input()
  project: FinalProject;
  isManager: boolean;

  constructor(
    private projectService: FinalProjectControllerService,
    public auth0: AuthService,
    private cachingService: CachedObjectsService,
  ) {}

  ngOnInit() {
    this.isManager = this.auth0.userHasRole(["SVP of Technology"]);

  }
  removeProject() {
    this.project.active = false;
    this.projectService
      .update(this.project)
      .toPromise()
      .then((t) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  activateProject() {
    this.project.active = true;
    this.projectService
      .update(this.project)
      .toPromise()
      .then((t) => {})
      .catch((error) => {
        console.log(error);
      });
  }
}
