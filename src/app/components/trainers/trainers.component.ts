import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { Curriculum } from "../../model/Curriculum";
import { Skill } from "../../model/Skill";
import { Trainer } from "../../model/Trainer";
import { CachedObjectsService } from "../../services/api/cache/cached-objects.service";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { FilehandlerService } from "../../services/api/filehandler-controller/filehandler-controller.service";
import { FillSkillsService } from "../../services/api/skill-controller/fill-skills.service";
import { TrainerControllerService } from "../../services/api/trainer-controller/trainer-controller.service";
import { AuthService } from "../../services/auth/auth.service";
import { AddTrainerErrorComponent} from "./add-trainer-error/add-trainer-error.component";
import { TrainersAddComponent } from "./trainers-add/trainers-add.component";

@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.css"],
})
export class TrainersComponent implements OnInit {
  [x: string]: any;

  firstName: string;
  lastName: string;
  trainers: Trainer[] = [];
  curricula: Curriculum[] = [];

  isManager = true;
  isLoading: boolean;

  canLoad = true;

  constructor(
    public dialog: MatDialog,
    private trainerService: TrainerControllerService,
    private curriculumService: CurriculumControllerService,
    private router: Router,
    public auth0: AuthService,
    private fillSkills: FillSkillsService,
    private cacheService: CachedObjectsService,
    private filehandlerService: FilehandlerService,
  ) {}

  ngOnInit() {
    this.isManager = true;
    this.isLoading = true;

    this.trainerService.findAll()
      .subscribe((trainers) => {
        this.trainers = trainers;
        this.isLoading = false;
      });
    this.curricula = this.cacheService.getCurricula();
    // if(this.trainers[0]){
    //   //If the trainers object is already loaded, no need to load it again
    //   this.isLoading = false;
    // }else{
    //   this.fillSkills.setList("trainer", () => {
    //     this.isLoading = this.fillSkills.isLoading;
    //     this.trainers = this.fillSkills.objs;
    //     console.log(this.trainers);
    //     this.cacheService.setTrainers(this.trainers);
    // })
  //}
    if (!this.curricula[0]){
      //Only load if cacheService was empty
      this.curriculumService
        .findAll()
        .toPromise()
        .then((curricula) => {
          this.curricula = curricula;
          this.cacheService.setCurricula(curricula);
        });
    }
  }

  showCalendar() {}

  grabS3Resume(trainer: Trainer) {
    this.filehandlerService.download(trainer).subscribe((data) => this.downloadFile(data));
  }

  downloadFile(data: Response) {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  // begin addTrainer
  addTrainer(): void {

    const trainer: Trainer = {
      id: null,
      firstName: "",
      lastName: "",
      isActive: true,
      preferredLocation: null,
      unavailabilities: [],
      email: "",
      skills: [],
      certifications: [],
      resume: "",
      linkedInUrl: "",
    };

    const dialogRef = this.dialog.open(TrainersAddComponent, {
      width: "450px",
      data: {
        trainer,
        curricula: this.curricula.filter( (a) => {
          if (a.isCore && a.isActive){
            return a;
          }

        }),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        //this checks to see if the email that was inputed is is unique
        //if not it opens an error dialog
        let isUnique = true;
        for (const trainer of this.trainers){
          if (result.email === trainer.email){
            isUnique = false;
            this.dialog.open(AddTrainerErrorComponent, {
              width: "450px",
            });
          }
        }
        if (isUnique){
          this.trainerService
          .create(result)
          .toPromise()
          .then((t) => {
            this.trainers.push(t);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
    });
  }
  // end addTrainer

}
