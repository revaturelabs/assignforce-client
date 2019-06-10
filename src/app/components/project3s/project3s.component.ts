import { Component, OnInit } from '@angular/core';
import { Project3 } from '../../model/Project3';
import { MatDialog } from '@angular/material';
import { Project3ControllerService } from '../../services/api/project3-controller/project3-controller.service';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { AuthService } from '../../services/auth/auth.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { Batch } from '../../model/Batch';
import { ProjectsAddComponent } from './projects-add/projects-add.component';

@Component({
  selector: 'app-project3s',
  templateUrl: './project3s.component.html',
  styleUrls: ['./project3s.component.css']
})
export class Project3sComponent implements OnInit {
  name: string;
  description: string;
  projects: Project3[] = [];
  isActive: boolean;
  batches: Batch[] = [];

  isLoading: boolean;
  canLoad = true;
  constructor(
    public dialog: MatDialog,
    private projectService: Project3ControllerService,
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
    const project3: Project3 = {
      id: null,
      name: '',
      description: '',
      isActive: true,
    };

    const dialogRef = this.dialog.open(ProjectsAddComponent, {
      width: '850px',
      data: {
        project: project3
      }
    });

    
  }

}
