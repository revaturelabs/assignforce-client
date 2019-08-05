import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation, DoCheck } from "@angular/core";
import { MatSort, MatTableDataSource, MatCheckbox, MatSelect, MatDatepicker } from "@angular/material";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

import { Batch } from "../../model/Batch";
import { Curriculum } from "../../model/Curriculum";
import { Address } from "../../model/Address";

import { BatchControllerService } from "../../services/api/batch-controller/batch-controller.service";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { TrainerControllerService } from "../../services/api/trainer-controller/trainer-controller.service";
import { AddressControllerService } from "../../services/api/address-controller/address-controller.service";
import { Skill } from "../../model/Skill";
import { Focus } from "../../model/Focus";
import { Trainer } from "../../model/Trainer";
import { Building } from "../../model/Building";
import { Room } from "../../model/Room";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { AuthService } from "../../services/auth/auth.service";
import { CachedObjectsService } from "../../services/api/cache/cached-objects.service";
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";
import { FillSkillsService } from "../../services/api/skill-controller/fill-skills.service";
import { Unavailability } from "../../model/Unavailability";
import { BuildingControllerService } from "../../services/api/building-controller/building-controller.service";
import { RoomControllerService } from "../../services/api/room-controller/room-controller.service";
import { FinalProjectControllerService } from "../../services/api/final-project-controller/final-project-controller.service";
import { FinalProject } from "../../model/FinalProject";

export enum BatchMode {
  Create = 1,
  Edit = 2
}

@Component({
  selector: "app-batches",
  templateUrl: "./batches.component.html",
  styleUrls: ["./batches.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class BatchesComponent implements OnInit, AfterViewInit {
  //--------------------VALUES FOR CREATING BATCHES-----------------------------------
  //Objects for storing batch form data
  batchForm: FormGroup;
  newBatch: Batch;
  skillsList: Skill[] = [];
  focuses: Focus[] = [];
  trainers: Trainer[] = [];
  students: number[] = [];
  buildings: Building[] = [];
  rooms: Room[] = [];
  skills: Skill[] = [];
  buildingRooms: Room[] = [];
  finalProjects: FinalProject[] = [];

  selectedLocation: Address;
  selectedBuilding: Building;
  selectedCurriculum = null;
  selectedFocus = null;
  sortedTrainers: any[] = [];

  //For form select in Create New Batch
  curriculums: Curriculum[] = [];
  locations: Address[] = [];
  buildingsOfALocation: Building[] = [];
  size: number = 0;

  // Autogenerated Batch Form Data
  numOfWeeksBetween = 0;
  genBatchName = "";
  genEndDate;

  currentDate = new Date(Date.now());
  isLoading: boolean;
  shouldUpdateTimeline: boolean;
  firstHeader = "Loading...";

  // ---------------------------------- VARIABLES FOR ALL BATCHES -----------------------------------
  //  COLUMNS FOR THE ALL BATCHES TAB
  batchColumns = [
    "name",
    "curriculum",
    "trainer",
    "location",
    "building",
    "room",
    "classSize",
    "startDate",
    "endDate",
    "finalProject",
    "Icons"
  ];

  allBatches: Batch[] = [];
  dataSource = new MatTableDataSource(this.allBatches);
  secondHeader = "Loading...";

  BatchMode = BatchMode;
  batchMode: BatchMode = BatchMode.Create;

  batchModel = new Batch();
  batchModelSkillArr: number[];
  constructor(
    private fb: FormBuilder,
    private curriculumService: CurriculumControllerService,
    private addressService: AddressControllerService,
    private trainerService: TrainerControllerService,
    private batchService: BatchControllerService,
    private skillsService: SkillControllerService,
    public auth0: AuthService,
    private cacheSerivice: CachedObjectsService,
    private fillSkills: FillSkillsService,
    private settingService: SettingControllerService,
    private buildingService: BuildingControllerService,
    private roomService: RoomControllerService,
    private finalProjectService: FinalProjectControllerService,
  ) {}

  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit() {
    this.isLoading = true;
    // ------------- Populating Data from Services -----------------

    this.settingService.find().subscribe((setting) => {
      for (let i = setting.minBatchSize; i <= setting.maxBatchSize; i++) {
        this.students.push(i);
      }
    });

    this.curriculumService.findAll().subscribe(
      (response) => {
        this.curriculums = response;
        this.firstHeader = "Create New Batch";
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.firstHeader = "Create Batch Form Disabled - Content Not Loaded";
        console.log(error);
      }
    );

    this.skillsService.findAll().subscribe((response) => {
      this.skills = response;
      this.isLoading = false;
    });

    this.addressService.findAll().subscribe((lList) => {
      this.locations = lList;
      this.locations.sort((a, b) => a.id - b.id);
      this.buildingService.findAll().subscribe((buildings) => {
        this.buildings = buildings;
        this.buildings.sort((a, b) => a.id - b.id);
        this.roomService.findAll().subscribe((rooms) => {
          this.rooms = rooms;
          this.rooms.sort((a, b) => a.id - b.id);
        });
      });
    });

    this.finalProjectService.findAll().subscribe((resp) => {
      this.finalProjects = resp;
    });

    if (this.trainers[0]) {
      this.isLoading = false;
    } else {
      this.fillSkills.setList("trainer", () => {
        this.isLoading = this.fillSkills.isLoading;
        this.trainers = this.fillSkills.objs;
        this.cacheSerivice.setTrainers(this.trainers);
      });
    }
    if (this.allBatches[0]) {
      // already loaded, don't need to reload
      this.secondHeader = 'All Batches';
      this.isLoading = false;
      this.dataSource.data = this.allBatches;
    } else {
      this.batchUpdate();
    }

    // ------------ Batch Form Validation --------------
    this.batchForm = this.fb.group({
      curriculum: [null, Validators.required],
      skills: [[]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      batchName: [null],
      trainer: [null],
      cotrainer: [null],
      students: [null],
      location: [null],
      building: [null],
      room: [null]
    });

    // ----- Observable for form changes in Create Batches panel ------

    this.batchForm.valueChanges.subscribe((data) => {
      const startDate = data.startDate;
      const endDate = new Date(data.endDate).getTime();
      const curriculum = this.curriculums.find((c) => c.id === data.curriculum);
      if (this.batchMode === BatchMode.Create) {
        this.batchModel.name = this.createBatchName(curriculum, null, startDate);
        if (startDate) {
          if (!this.endDateIsSet()) {
            this.batchModel.endDate = <any>this.computeDefaultEndDate(startDate);
          }
          this.numOfWeeksBetween = this.computeNumOfWeeksBetween(startDate, this.batchModel.endDate);
        }
      } else if (this.batchMode === BatchMode.Edit) {
        if (startDate) {
          this.batchModel.name = this.createBatchName(curriculum, null, startDate);

          this.numOfWeeksBetween = this.computeNumOfWeeksBetween(startDate, endDate);
        }
      }
    });

    this.settingService.find().subscribe((setting) => {
      this.size = setting.reportIncomingGrads;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        // Sort by trainer name instead of id
        case "trainer":
          const trainer = this.entityLookup("trainers", item.trainer);
          if (typeof trainer !== "undefined") {
            return trainer.firstName;
          }
          break;
        default: return item[property];
      }
    };
  }

  entityLookup(entityContainerName: string, entityId: number) {
    /*
      custom lookup due to model for buildings being weird and using buildingId and buildingName
      instead of id and name
    */
    if (entityContainerName === "buildings") {
      return this[entityContainerName].find((e) => e.id === entityId);
    }

    return this[entityContainerName].find((e) => e.id === entityId);
  }

  updateCurriculum() {
    // Checking if Curriculum has been selected, if so, populate focuses and skills
    if (!this.batchModel.curriculum) return;
    this.selectedCurriculum = this.batchModel.curriculum;
    this.batchModel.skills = this.selectSkills(this.batchModel.curriculum);
    this.batchModelSkillArr = this.batchModel.skills.map((skill) => skill.id);

    if (this.batchMode === BatchMode.Create) {
      this.batchModel.trainer = null;
      this.batchModel.cotrainer = null;
    }

    this.sortTrainers();
  }

  updateLocation() {
    // Checking if Location has been selected, if so, populate buildings
    console.log("pop buildings");
    if (!this.batchModel.location) return;
    console.log(this.batchModel);
    this.selectedLocation = this.locations.find((location) => location.id === this.batchModel.location);
    this.buildingsOfALocation = this.buildings.filter((building) => building.address === this.selectedLocation.id);
  }

  updateBuilding() {
    // Checking if Building has been selected, if so, populate rooms

    if (!this.batchModel.building) return;

    this.buildingRooms = [];
    this.selectedBuilding = this.buildings.find((building) => building.id === this.batchModel.building);
    this.buildingRooms = this.rooms.filter((room) => room.building === this.selectedBuilding.id);
  }

  sortTrainers() {
    const curr = this.curriculums.find((c) => c.id === this.selectedCurriculum);
    //changed this to allow for skillsMapping and skillsMatch to work
    var skillsMapping = 0;
    var skillsMatch = [];
    this.sortedTrainers = [];

    this.trainers.forEach((trainer) => {
      if (!trainer.isActive) {
        return;
      }

      if (trainer.skills.length > 0) {
        skillsMatch = trainer.skills.filter(
          (tSkill) => curr.skills.findIndex((cSkill) => tSkill.id === cSkill.id) >= 0
        );
      }
      skillsMapping = Math.floor((skillsMatch.length / Math.max(curr.skills.length, 1)) * 100);
      const t = <any>Object.assign({}, trainer);
      t.skillsMapping = skillsMapping;
      this.sortedTrainers.push(t);
    });
    this.sortedTrainers.sort((a, b) => b.skillsMapping - a.skillsMapping);
    this.filterUnavailableTrainers();
  }

  /* remove trainers with unavailabilities within selected date */
  /* for now the trainer would have to be available within the entire selected date range */
  filterUnavailableTrainers() {
    if (!this.batchModel.startDate) return;

    this.sortedTrainers = this.sortedTrainers.filter((trainer) => {
      if (trainer.unavailabilities.length == 0) return true; // no unavailabilities

      let unavailabilities = trainer.unavailabilities.filter((unavailability) => {
        return (
          (new Date(unavailability.startDate) > new Date(this.batchModel.startDate) &&
            new Date(unavailability.startDate) < new Date(this.batchModel.endDate)) ||
          (new Date(unavailability.endDate) > new Date(this.batchModel.startDate) &&
            new Date(unavailability.endDate) < new Date(this.batchModel.endDate))
        );
      });

      return !(unavailabilities.length > 0);
    });
  }
  // ------ Create a new batch using provided valid form data ------
  onSubmit(event) {
    this.batchModel = Object.assign(this.batchModel, event);

    let tempDate = new Date(this.batchModel.startDate);
    tempDate.setHours(9);
    //@ts-ignore
    this.batchModel.startDate = tempDate.toISOString();

    tempDate = new Date(this.batchModel.endDate);
    tempDate.setHours(17);

    //@ts-ignore
    this.batchModel.endDate = tempDate.toISOString();
    if (this.batchMode === BatchMode.Create) {
      this.batchService
        .create(this.batchModel)
        .subscribe((batch) => {
          this.allBatches.push(batch);
          this.dataSource.data = this.allBatches;
          console.log(batch);
        });
    } else if (this.batchMode === BatchMode.Edit) {
      this.batchService
        .update(this.batchModel)
        .subscribe(() => {
          const i = this.allBatches.findIndex((b) => b.id === this.batchModel.id);
          this.allBatches[i] = this.batchModel;
          this.dataSource.data = this.allBatches;
        })
    }

    this.shouldUpdateTimeline = true;
  }

  onCancel() {
    this.batchMode = BatchMode.Create;
    this.batchModel = new Batch();
  }

  // --------------------------- Methods for auto generating form values -------------------------------------
  //Calculate number of weeks between two dates
  computeNumOfWeeksBetween(startDate: number, endDate: number): number {
    const startValue = new Date(startDate).valueOf();
    const endValue = new Date(endDate).valueOf();
    if (startValue && endValue) {
      const numberOfDays = Math.abs(<any>startValue - <any>endValue) / (1000 * 60 * 60 * 24);
      const numberOfWeeks = Math.floor(numberOfDays / 7);
      return numberOfWeeks;
    }
    return 0;
  }

  //Calculate the Date of Ten weeks later from start date
  computeDefaultEndDate(startDate: number): Date {
    const dateValue = new Date(startDate);
    if (dateValue) {
      const tenWeeks = 1000 * 60 * 60 * 24 * 7 * 10 + 1000 * 60 * 60 * 24 * 4;
      return new Date(dateValue.valueOf() + tenWeeks);
    }
  }

  //Generate Batch Name based on curriculum and/or focus and start date
  createBatchName(curriculum: Curriculum, focus: Focus, startDate: number): string {
    if (curriculum && startDate) {
      const date = new Date(startDate);
      const year = date
        .getFullYear()
        .toString()
        .substr(-2);
      let day = date.getDate().toString();
      let month = (date.getMonth() + 1).toString();
      const monthName = date.toLocaleString("en-us", { month: "short" });

      if (date.getDate() < 10) {
        day = "0" + day;
      }
      if (date.getMonth() < 10) {
        month = "0" + month;
      }
      if (focus) {
        return year + "" + month + " " + monthName + "" + day + " " + curriculum.name + " " + focus.name;
      }
      return year + "" + month + " " + monthName + "" + day + " " + curriculum.name;
    }
    return "";
  }

  selectSkills(currId: number) {
    const curriculum = this.curriculums.find((c: Curriculum) => c.id === currId);
    return curriculum.skills;
  }

  // -------------------------------------------- End auto generate methods -----------------------------------------

  // --------------------------------------- Begin Methods for All Batches Panel ------------------------------------
  editBatch(batch: Batch) {
    this.batchMode = BatchMode.Edit;
    this.batchModel = new Batch();

    /* temp fix for timezone issue */

    /* this problem only comes up when editing a batch */
    Object.assign(this.batchModel, batch);
    this.batchForm.markAsDirty(); //won't work if after updateCurriculum method
    if (this.batchModel.curriculum) this.updateCurriculum();
    if (this.batchModel.location) this.updateLocation();
    if (this.batchModel.building) this.updateBuilding();
    this.batchForm.clearValidators();
    this.cacheSerivice.setBatches(this.allBatches);
  }

  cloneBatch() {
    //TODO
  }

  deleteBatch(batch: Batch) {
    this.batchService
      .remove(batch.id)
      .toPromise()
      .then(() => {
        this.refreshBatches(batch.id);
      });
  }

  endDateIsSet(): boolean {
    return  !!this.batchModel.endDate;
  }

  // ---------------------------------------- End Methods for All Batches Panel -------------------------------------
  // ---------------------------------------- Method to Refresh All Batches Data ----

  refreshBatches(deleting?: number) {
    // temp fix for deletions not being reflected
    if (deleting) {
      this.allBatches = this.allBatches.filter((b) => b.id != deleting);
    }
    this.batchUpdate();
    this.batchMode = BatchMode.Create;
  }

  batchUpdate(){
    //grab update data from database
    this.batchService
      .findAll()
      .toPromise()
      .then((response) => {
        this.allBatches = response;
        this.secondHeader = "All Batches";
        this.isLoading = false;
        this.dataSource.data = this.allBatches;
        this.cacheSerivice.setBatches(response);
      })
      .catch((error) => {
        this.isLoading = false;
        this.secondHeader = "Could Not Load Batches";
        console.log(error);
      });
  }
}
