import { Component, OnInit } from '@angular/core';
import { Project3 } from '../../../model/Project3';
import { Project3ControllerService } from '../../../services/api/project3-controller/project3-controller.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CachedObjectsService } from '../../../services/api/cache/cached-objects.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  project: Project3;
  isManager: boolean;
  
  constructor(
    private projectService: Project3ControllerService,
    public auth0: AuthService,
    private cachingService: CachedObjectsService
  ) {}

  ngOnInit() {
    this.isManager = this.auth0.userHasRole(['SVP of Technology']);
    
  }
  removeProject() {
    this.project.isActive = false;
    this.projectService
      .update(this.project)
      .toPromise()
      .then(t => {})
      .catch(error => {
        console.log(error);
      });
  }

  activateProject() {
    this.project.isActive = true;
    this.projectService
      .update(this.project)
      .toPromise()
      .then(t => {})
      .catch(error => {
        console.log(error);
      });
  }
}
