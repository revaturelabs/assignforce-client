/**
 *  Batch Form Component
 *
 * @author Auguest Duet
 */

import { Component, EventEmitter, Input , OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Address } from "../../model/Address";
import { Batch } from "../../model/Batch";
import { Building } from "../../model/Building";
import { Curriculum } from "../../model/Curriculum";
import { FinalProject } from "../../model/FinalProject";
import { Room } from "../../model/Room";
import { Setting } from "../../model/Setting";
import { Skill } from "../../model/Skill";
import { Trainer } from "../../model/Trainer";
import { AddressControllerService } from "../../services/api/address-controller/address-controller.service";
import { BuildingControllerService } from "../../services/api/building-controller/building-controller.service";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { FinalProjectControllerService } from "../../services/api/final-project-controller/final-project-controller.service";
import { RoomControllerService } from "../../services/api/room-controller/room-controller.service";
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { TrainerControllerService } from "../../services/api/trainer-controller/trainer-controller.service";
import { BatchMode } from "../batches/batches.component";
import { Sprint } from "../../model/sprint";
import { SprintControllerService } from "../../services/api/sprint-controller/sprint-controller.service";

@Component({
  selector: "app-batch-form",
  templateUrl: "./batch-form.component.html",
  styleUrls: ["./batch-form.component.css"],
})
export class BatchFormComponent implements OnInit, OnChanges {
  //inputs & outputs
  @Input() options: {mode: BatchMode, model: Batch} = {mode: BatchMode.Create, model: null};
  @Output() batchSubmitted: EventEmitter<Batch> = new EventEmitter<Batch>();
  @Output() actionCancelled: EventEmitter<null> = new EventEmitter<null>();
  @Input() trainerList: Trainer [] = null;
  @Input() curriculumList: Curriculum [] = null;
  @Input() skillsList: Skill [] = null;
  @Input() locationList: Address [] = null;
  @Input() buildingList: Building [] = null;
  @Input() roomsList: Room [] = null;
  @Input() finalProjectList: FinalProject [] = null;

  //for manager
  batchFormGroup: FormGroup;

  //data containers
  curricula: Curriculum[] = new Array<Curriculum>();
  trainers: Trainer[] = new Array<Trainer>();
  locations: Address[] = new Array<Address>();
  buildings: Building[] = new Array<Building>();
  filteredBuildings: Building[] = new Array<Building>();
  rooms: Room[] = new Array<Room>();
  filteredRooms: Room[] = new Array<Room>();
  allSkills: Skill[] = new Array<Skill>();

  filteredSkills: Array<{id: number}> = new Array<{id: number}>();
  finalProjects: FinalProject[] = new Array<FinalProject>();
  

  //state trackers
  isDataLoading: boolean;
  startDate = this.getMondayForStartDate();
  batchSpan: number;
  minBatchTarget = 0;
  maxBatchTarget= 0;
  nameTempString: string;
  endDate: Date;
  numOfWeeksBetween = 0;
 

  constructor(
    private curriculumService: CurriculumControllerService,
    private skillsService: SkillControllerService,
    private settingsService: SettingControllerService,
    private trainerService: TrainerControllerService,
    private locationService: AddressControllerService,
    private buildingService: BuildingControllerService,
    private roomService: RoomControllerService,
    private finalProjectService: FinalProjectControllerService) {
  }

  ngOnInit() {
    //create the form group for the template
    this.batchFormGroup = new FormGroup({
      curriculum: new FormControl(
        {
          value: null,
          disabled: this.isDataLoading
        },
        Validators.required
        ),
      skills: new FormControl(
        {
          value: null,
          disabled: this.isDataLoading
        }
      ),
      startDate: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      },
      Validators.required,
      ),
      endDate: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      },
      Validators.required,
      ),
      name: new FormControl({
        value: "",
      }),
      trainer: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      }),
      cotrainer: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      }),
      size: new FormControl({
        value: this.minBatchTarget,
        disabled: this.isDataLoading,
      }),
      location: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      }),
      building: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      }),
      room: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      }),
      finalProject: new FormControl({
        value: null,
        disabled: this.isDataLoading,
      }),
  
  });

  
    //load the appropriate data
    this.isDataLoading = true;
    this.loadSettings();
    this.isDataLoading = false;

    //subscribe to form group changes
    this.onFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options &&
        changes.options.currentValue.mode === BatchMode.Edit &&
        changes.options.currentValue.model) {
      this.setupEditing(changes.options.currentValue.model);
    }
    this.loadCurricula();
    this.loadTrainers();
    this.loadLocations();
    this.loadSkills();
    this.loadFinalProjects();
  }

  /**
   * Method to setup editing for the batch
   *
   * @private
   * @param {Batch} model
   * @memberof BatchFormComponent
   */
  private setupEditing(model: Batch) {
    this.batchFormGroup.get("curriculum").setValue(model.curriculum);
    this.batchFormGroup.get("startDate").setValue(new Date(model.startDate));
    this.batchFormGroup.get("endDate").setValue(new Date(model.endDate));
    this.batchFormGroup.get("name").setValue(model.name);
    this.batchFormGroup.get("trainer").setValue(model.trainer);
    this.batchFormGroup.get("cotrainer").setValue(model.cotrainer);
    this.batchFormGroup.get("size").setValue(model.size || this.minBatchTarget);
    this.batchFormGroup.get("location").setValue(model.location);
    this.batchFormGroup.get("building").setValue(model.building);
    this.batchFormGroup.get("room").setValue(model.room);
    this.batchFormGroup.get("finalProject").setValue(model.finalProject);
  
  }

  private async loadLocations() {
    this.locations = this.locationList;
    this.locations = this.locations.filter(loc => loc.isActive);

    this.buildings = this.buildingList;
    this.buildings = this.buildings.filter(b => b.isActive);

    this.rooms = this.roomsList;
  }
  private async loadTrainers() {
    this.trainers = this.trainerList;
    this.trainers = this.trainers.filter(trainer => trainer.isActive)
  }

  private async loadCurricula() {
    this.curricula = this.curriculumList;
  }

  private async loadSkills() {
    this.allSkills = this.skillsList;
  }

  private async loadFinalProjects() {
    this.finalProjects = this.finalProjectList;
    this.finalProjects = this.finalProjects.filter(project => project.isActive);
  }

  private async loadSettings() {
    const settings: Setting = await this.settingsService.find().toPromise();
    this.batchSpan = settings.batchLength;
    this.nameTempString = settings.defaultNamePattern;
    this.minBatchTarget = settings.minBatchSize;
    this.maxBatchTarget = settings.maxBatchSize;
    this.batchFormGroup.get("size").setValue(this.minBatchTarget);
  }

  private onFormChanges() {
    this.batchFormGroup.get("name").setValue("");
    //observe the curriculum field for changes to populate the skills dropdown
    this.batchFormGroup.get("curriculum").valueChanges.subscribe((val) => {
      this.isDataLoading = true;
      this.filterCurriculumSkills(val);
      this.batchFormGroup.get("skills").setValue(this.filteredSkills);
      this.generateBatchName();
      this.isDataLoading = true;
    });

    this.batchFormGroup.get("startDate").valueChanges.subscribe((val) => {
      this.isDataLoading = true;
      this.endDate = this.getFridayForEndDate(val);
      this.batchFormGroup.get("endDate").setValue(this.endDate);
      this.generateBatchName();
      this.isDataLoading = false;
    });

    this.batchFormGroup.get("endDate").valueChanges.subscribe((val) => {
      const start = new Date(this.batchFormGroup.get("startDate").value);
      const end = new Date(val);
      this.numOfWeeksBetween = this.calculateBatchSpan(start, end);
    });

    this.batchFormGroup.get("location").valueChanges.subscribe((val) => {
      this.isDataLoading = true;
      this.filterLocationBuildings(val);
      this.isDataLoading = false;
    });

    this.batchFormGroup.get("building").valueChanges.subscribe((val) => {
      this.isDataLoading = true;
      this.filterBuildRooms(val);
      this.isDataLoading = false;
    });

    this.batchFormGroup.get("finalProject").setValue("");
  }

  /**
   * Method to filter building rooms by building id number.
   *
   * @private
   * @param {number} selBuildingId
   * @memberof BatchFormComponent
   */
  private filterBuildRooms(selBuildingId: number){
    console.log(selBuildingId);
    console.log(this.rooms);
    this.filteredRooms = this.rooms.filter((room) => room.building === selBuildingId);
  }
  private filterLocationBuildings(selLocId: number){
    this.filteredBuildings = this.buildings.filter((building) => building.address === selLocId);
  }


  private filterCurriculumSkills(selCurrId: number) {
    const selectedCurriculum = this.curricula.find((curr) => curr.id === selCurrId);
    if (selectedCurriculum) {
      this.filteredSkills = this.allSkills.filter((skill) => {
        return selectedCurriculum.skills.find((cSkill) => skill.id === cSkill.id);
      });
    }
  }

  /**
   * Method that gets the Friday for the end of the batch
   *
   * @private
   * @param {Date} val
   * @returns { Date } Friday of end of batch
   * @memberof BatchFormComponent
   */
  private getFridayForEndDate(val: Date) {
    const d = new Date(val);
    const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? 5 : -2);
    const friday = new Date(d.setDate(diff));
    return new Date(friday.getTime() + 7 * this.batchSpan * 24 * 60 * 60 * 1000);
  }

  /**
   * Method to get the Monday of the Batch Start
   *
   * @private
   * @returns { Date } Date object is date of Monday for Start Date
   * @memberof BatchFormComponent
   */
  private getMondayForStartDate() {
    const now = new Date();
    const day = now.getDay(),
      diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    return new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  /**
   * Method to calculate the number of days a batch spans.
   *
   * @private
   * @param {Date} start
   * @param {Date} end
   * @returns { Number } Number of days
   * @memberof BatchFormComponent
   */
  private calculateBatchSpan(start: Date, end: Date) {
    const startTime = start.getTime();
    const endTime = end.getTime();

    if (startTime && endTime){
      const numDays = Math.abs(startTime - endTime) / (1000 * 60 * 60 * 24);
      return Math.ceil(numDays / 7);
    }

  }

  private generateBatchName() {
    const curriculumId = this.batchFormGroup.get("curriculum").value;
    const startDate = this.batchFormGroup.get("startDate").value;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let name = this.nameTempString;
    if (curriculumId && startDate) {
      const year = startDate.getFullYear().toString().substr(-2);
      const day = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
      const month = startDate.getMonth() < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
      const monAbbr = months[startDate.getMonth()];
      const currName = this.curricula.find((curr) => curr.id === curriculumId).name;
      name = name.replace("$y", year);
      name = name.replace("$m", month.toString());
      name = name.replace("$d", day.toString());
      name = name.replace("$mmm", monAbbr);
      name = name.replace("$c", currName);
      this.batchFormGroup.get("name").setValue(name);
    }
  }

  /**
   * Checks if a skill number is equal to a skill
   *
   * @param {number} a
   * @param {Skill} b
   * @returns { boolean }
   * @memberof BatchFormComponent
   */
  skillsComparator(a: number, b: Skill) {
    if (b) {
      return a === b.id;
    }
    return false;
  }

  /**
   * Method to handle "Cancel" button click on batch form.
   *
   * @memberof BatchFormComponent
   */
  onCancel() {
    this.actionCancelled.emit();
    this.batchFormGroup.reset();
    this.batchFormGroup.get("size").setValue(this.minBatchTarget);
  }

  /**
   * Method to handle form submission from batch form.
   *
   * @param {Batch} value
   * @memberof BatchFormComponent
   */
  onSubmit(value: Batch) {
    this.batchSubmitted.emit(value);
    this.batchFormGroup.reset();
    this.batchFormGroup.get("size").setValue(this.minBatchTarget);
  }
}
