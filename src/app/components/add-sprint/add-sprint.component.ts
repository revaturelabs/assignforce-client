<<<<<<< HEAD
import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Sprint} from "../../model/sprint";
import {SprintControllerService} from "../../services/api/sprint-controller/sprint-controller.service";
import {AuthService} from "../../services/auth/auth.service";



=======
import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {Sprint} from "../../model/sprint";
import {FinalProjectControllerService} from "../../services/api/final-project-controller/final-project-controller.service";
import {SkillControllerService} from "../../services/api/skill-controller/skill-controller.service";
import {SprintControllerService} from "../../services/api/sprint-controller/sprint-controller.service";
import {AuthService} from "../../services/auth/auth.service";

>>>>>>> 279b3efb994f2247dadfeb32796234fbea0a2ca3
@Component({
  selector: "app-add-sprint",
  templateUrl: "./add-sprint.component.html",
  styleUrls: ["./add-sprint.component.css"],
})
export class AddSprintComponent implements OnInit {

  sprints: Sprint[];
  isLoading: boolean;
  projectID: number;


  constructor(private sprintService: SprintControllerService,
<<<<<<< HEAD
=======
              private finalProjectService: FinalProjectControllerService,
              private dialog: MatDialog,
              private skillControllerService: SkillControllerService,
>>>>>>> 279b3efb994f2247dadfeb32796234fbea0a2ca3
              public auth0: AuthService,
              private router: Router,
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
              console.log(this.sprints.length);
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
      const projectName = this.finalProjectService.find(ProjectId).subscribe((project) => {
        const name = "Sprint for " + project.name;
        const body = '{"finalProject":' + project.id + "}";
        this.sprintService.createSprint(name, body, () => {
          this.sprints.push({name, body: JSON.parse(body), id: undefined});
        });
      });
    }

    count(sprints) {
      var c = 0;
      if(!sprints) {
        return -1;
      }
      for(let sprint of sprints) {
        if(sprint.body.finalProject === this.projectID) {
          c++;
        }
      }
      return c;
    }
      /*
      for(var i = 0; i < this.length; i++) {
        if(typeof(sprints[i]) !== "undefined") {
          if(typeof(sprints[i]) == "string" && sprints[i].length == 0) {
          } else { 
            c++;
          }
        }
      }
      return c;
      */
    
   
  }