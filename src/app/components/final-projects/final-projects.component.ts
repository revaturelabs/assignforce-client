import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Batch } from "../../model/Batch";
import { FinalProject } from "../../model/FinalProject";
import { BatchControllerService } from "../../services/api/batch-controller/batch-controller.service";
import { CachedObjectsService } from "../../services/api/cache/cached-objects.service";
import { FinalProjectControllerService } from "../../services/api/final-project-controller/final-project-controller.service";
import { SprintControllerService } from "../../services/api/sprint-controller/sprint-controller.service";
import { AuthService } from "../../services/auth/auth.service";
import { ProjectsAddComponent } from "./projects-add/projects-add.component";

@Component({
  selector: "app-final-projects",
  templateUrl: "./final-projects.component.html",
  styleUrls: ["./final-projects.component.css"],
})
export class FinalProjectsComponent implements OnInit {
  name: string;
  description: string;
  projects: FinalProject[] = [];
  isActive: boolean;
  batches: Batch[] = [];

  isLoading: boolean;
  canLoad = true;
  constructor(
    public dialog: MatDialog,
    private projectService: FinalProjectControllerService,
    private batchService: BatchControllerService,
    public auth0: AuthService,
    private cacheService: CachedObjectsService,
    private sprintService: SprintControllerService,
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.projectService.findAll()
      .subscribe((projects) => {
        this.projects = projects;
        this.isLoading = false;
      });
    this.batches = this.cacheService.getBatches();
    //
    // tslint:disable-next-line:one-line
    if (!this.batches[0]){
      // tslint:disable-next-line:comment-format
      //only load if cacheService was empty
      this.batchService
        .findAll()
        .toPromise()
        .then((batches) => {
          this.batches = batches;
          this.cacheService.setBatches(batches);
        });
    }
  }

  addProject(): void {
    const finalProject: FinalProject = {
      id: null,
      name: "",
      description: "",
      isActive: true,
    };

    const dialogRef = this.dialog.open(ProjectsAddComponent, {
      width: "850px",
      data: {
        project: finalProject,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService
        .create(result)
        .toPromise()
        .then((t) => {
          this.projects.push(t);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    });
  }

  createSprint(name, body) {
    console.log("Clicked!");
    this.sprintService.createSprint(name, body);
  }

  getSprints() {
    console.log("work");
    this.sprintService.getAll();
  }
}
