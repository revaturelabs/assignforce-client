import { Component, OnInit } from '@angular/core';
import { FinalProject } from '../../model/FinalProject';
import { MatDialog } from '@angular/material';
import { FinalProjectControllerService } from '../../services/api/final-project-controller/final-project-controller.service';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { AuthService } from '../../services/auth/auth.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { Batch } from '../../model/Batch';
import { ProjectsAddComponent } from './projects-add/projects-add.component';

@Component({
  selector: 'app-final-projects',
  templateUrl: './final-projects.component.html',
  styleUrls: ['./final-projects.component.css']
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
    private cacheService: CachedObjectsService
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
    if(!this.batches[0]){
      //only load if cacheService was empty
      this.batchService
        .findAll()
        .toPromise()
        .then(batches => {
          this.batches = batches;
          this.cacheService.setBatches(batches);
        });
    }
  }

  addProject(): void {
    const finalProject: FinalProject = {
      id: null,
      name: '',
      description: '',
      isActive: true,
    };

    const dialogRef = this.dialog.open(ProjectsAddComponent, {
      width: '850px',
      data: {
        project: finalProject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService
        .create(result)
        .toPromise()
        .then(t => {
          this.projects.push(t);
        })
        .catch(error => {
          console.log(error);
        })
      }
    });
  }

}
