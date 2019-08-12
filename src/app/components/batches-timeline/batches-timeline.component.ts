import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  Input
} from "@angular/core";
// import { BatchControllerService } from "../../services/api/batch-controller/batch-controller.service";
import {
  MatSelectChange,
  MatCheckboxChange,
  MatOption
} from "@angular/material";
// import { TrainerControllerService } from "../../services/api/trainer-controller/trainer-controller.service";
import { Batch } from "../../model/Batch";
import { Trainer } from "../../model/Trainer";
import { Curriculum } from "../../model/Curriculum";
import { Address } from "../../model/Address";
import { Building } from "../../model/Building";
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";
// import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { AddressControllerService } from "../../services/api/address-controller/address-controller.service";
import { BatchesTimelineFilterComponent } from "../../components/batches-timeline-filter/batches-timeline-filter.component";
// import { RoomControllerService } from "../../services/api/room-controller/room-controller.service";
import { BuildingControllerService } from "../../services/api/building-controller/building-controller.service";
import { Room } from "../../model/Room";

@Component({
  selector: "app-batches-timeline",
  templateUrl: "./batches-timeline.component.html",
  styleUrls: ["./batches-timeline.component.css"]
})
export class BatchesTimelineComponent implements OnInit, AfterViewInit {
  //Get child component to access variables. Is it bad practice? I don't know.
  @ViewChild(BatchesTimelineFilterComponent) batchesTimelineFilterComponent : BatchesTimelineFilterComponent;
  // root element of the timeline. used for getting the relative mouse position
  @ViewChild("timelineroot") timelineRootElement: ElementRef;
  // trainer name. used to set the width
  @ViewChild("trainernames") trainernamesElement: ElementRef;
  // trainer name. used to set the width
  @ViewChildren("tooltiptext") tooltipTexts;

  @Input() shouldUpdate(update: boolean){
    if(update){
      this.updateBatches();
    }
  };
  // dynamic values for formatting
  width = 1536;
  swimlaneXOfs = 100;
  columnWidth = 50;
  loading = false;
  // static values for formatting
  height = 2067;
  minColumnWidth = 26;
  maxColumnWidth = 100;
  minWidth = 400;
  swimlaneYOfs = 20;
  timescaleXOfs = 80;
  DEFAULT_PRECEEDING_MONTHS = 3;
  DEFAULT_PROCEEDING_MONTHS = 6;
  ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  // editable data
  startDate: Date;
  endDate: Date;
  curriculumFilter : Curriculum;
  focusFilter = "Any";
  locationFilter: Address;
  buildingFilter: Building;
  hideBatchlessTrainers = true;
  hideConcludedBatches = true;
  hideInactiveTrainers = true;
  trainersPerPage = 0;
  actualTrainersPerPage = 0;
  currentPage = 0;
  maxPages = 1;
  trainersOnThisPage = 0;

  startValue: number;
  endValue: number;
  todayLine = { x1: 0, x2: 0, y1: 0, y2: 0 };

  // months and day of weeks
  fullMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  shortMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  timescaleEnabled = true;

  // zooming
  zoomingEnabled = true;
  zooming = false;
  minZoom = 1000 * 60 * 60 * 12; // 1/2 a day
  maxZoom = 1000 * 60 * 60 * 24 * 365 * 2000; // 2000 years
  zoomingFrom: number;
  zoomingFromDate: number;
  zoomingLine = { x1: 0, x2: 0, y1: 0, y2: 0 };
  preZoomBeforeDuration: number;
  preZoomAfterDuration: number;
  zoomScale = 0.01; // px to zoom scale
  shifting = false;

  // useful keycodes
  keycodes = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    space: 32,
    primary: 66,
    secondary: 65,
    z: 90,
    tilde: 192,
    p: 80,
    enter: 13,
    tab: 9,
    plus: 187,
    minus: 189,
    esc: 27
  };
  keyBoardScrollEnabled = true;
  keyScrollSpeed = 0.01;

  // swimmer
  swimActive = false;
  swimPos = {
    x: 0,
    y: 0,
    color: "#000000",
    r: 0,
    points: { x: 0, y: 0 },
    highpoints: { x: 0, y: 0 }
  };
  swimGauge = {
    value: 0,
    y1: 0,
    y2: 0,
    bgy1: 0,
    bgy2: 0,
    x1: 0,
    x2: 0,
    bgx1: 0,
    bgx2: 0,
    w: 0
  };
  swimDots = [];
  swimLane = 0;
  swimStartProgress = 0;
  swimDown = false;
  swimPoints = 0;
  swimHigh = 0;
  swimPaused = false;

  // random mode
  randomModeActive = false;

  // tooltip
  tooltipActive = false;
  tooltipRect = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    linespacing: 15,
    color: "#000000cc",
    triangle: "0,0 0,0 0,0"
  };
  tooltipData = [];
  tooltipLastBatch = null;
  tooltipTimeoutDur = 120;
  tooltipTimeoutTimer = null;
  tooltipSetThisFrame = false;
  tooltipDefaultColor = "#ffffff";
  tooltipTitleColor = "#FFA500";
  tooltipMidSectionColor = "#FFD700";
  tooltipNoneColor = "#FF6347";

  // cached data
  @Input() batchList: Batch[] = null;
  batchFilteredList = [];
  @Input() trainerList: Trainer[] = null;
  trainerFilteredList = [];
  @Input() curriculumList: Curriculum[] = null;
  @Input() buildingList: Building[] = null; //TODO need to verify correct building array
  locationList = [];
  // @Input() roomList: Room[]; //TODO need to investigate correct rooms
  @Input() locationListChild: Address[] = null;

  constructor(
    private settingControllerService: SettingControllerService,
    private addressController: AddressControllerService,
  ) {}

  // initialize data
  ngOnInit() {
    this.curriculumFilter = this.batchesTimelineFilterComponent.curriculumAny;
    this.locationFilter = this.batchesTimelineFilterComponent.locationAny;
    this.buildingFilter = this.batchesTimelineFilterComponent.buildingAny;
    this.loadInitialDates();
    this.currentPage = 0;
    this.updateSettings();
    this.updateCurriculums();
    this.updateLocations();
    this.updateBatches();
    this.updateTrainers();
    if(this.batchList !== null) { this.filterBatches(); }
    if(this.trainerList !== null) { this.filterTrainers(); }
    this.updateTodayLine();
    this.updatePage();
  }

  ngOnChanges(){
    this.updateBatches();
    this.filterBatches();
    this.filterTrainers();
    this.updateTodayLine();
    this.updatePage();
  }

  // set initial values for start and end dates
  loadInitialDates() {
    // start date
    const preceedingDate = new Date();
    preceedingDate.setMonth(
      preceedingDate.getMonth() - this.DEFAULT_PRECEEDING_MONTHS
    );
    this.startValue = preceedingDate.valueOf();
    // end date
    const proceedingDate = new Date();
    proceedingDate.setMonth(
      proceedingDate.getMonth() + this.DEFAULT_PROCEEDING_MONTHS
    );
    this.endValue = proceedingDate.valueOf();
    this.updateDateFilters();
  }

  // setup page size
  ngAfterViewInit() {
    // causes exception if done without a delay
    setTimeout(() => {
      this.updateSize();
    }, 0);
  }

  // this is called when any of the filters are changed
  onFilterChange(event) {
    // get id and value from the event
    let id = "";
    let value;
    if (event instanceof MatSelectChange) {
      id = event.source.id;
      const matopt = event.source.selected;
      if (matopt instanceof MatOption) {
        value = matopt.value;
        console.log(matopt);
      }
    } else if (event instanceof MatCheckboxChange) {
      id = event.source.id;
      value = event.checked;
    } else if (event.targetElement != null) {
      // mat input date event
      id = event.targetElement.id;
      value = event.value;
    } else if (event.target != null) {
      id = event.target.id;
      if (event.value != null) {
        value = event.value;
      } else {
        value = event.target.value;
      }
    }

    // handle the event with the specified id
    switch (id) {
      case "startDate": {
        this.startValue = value;
        this.updateTodayLine();
        break;
      }
      case "endDate": {
        this.endValue = value;
        this.updateTodayLine();
        break;
      }
      case "curriculum": {
        this.curriculumFilter = value;
        this.filterBatches();
        break;
      }
      case "location": {
        this.locationFilter = value;
        this.filterBatches();
        break;
      }
      case "building": {
        this.buildingFilter = value;
        this.filterBatches();
        break;
      }
      case "hideconcluded": {
        this.hideConcludedBatches = !value;
        this.filterBatches();
        break;
      }
      case "hidebatchless": {
        this.hideBatchlessTrainers = !value;
        this.filterTrainers();
        break;
      }
      case "hideinactive": {
        this.hideInactiveTrainers = !value;
        this.filterTrainers();
        break;
      }
      case "trainersperpage": {
        if (!Number(value)) {
          this.trainersPerPage = 0;
        } else {
          this.trainersPerPage = Math.max(0, Number.parseInt(value));
        }
        break;
      }
      case "currentpage": {
        this.currentPage = Math.max(0, value - 1);
        break;
      }
      case "firstpage": {
        this.currentPage = 0;
        break;
      }
      case "lastpage": {
        this.currentPage = this.maxPages;
        break;
      }
      case "previouspage": {
        this.currentPage = Math.max(0, this.currentPage - 1);
        break;
      }
      case "nextpage": {
        this.currentPage = this.currentPage + 1;
        break;
      }
      default: {
        console.log(
          "unknown event filter triggered! " + event + "\n" + event.target
        );
      }
    }
    this.updatePage();
  }

  // updates the max pages
  // TODO: should probably get some logic for negative values and values > max pages
  updatePage() {

    if (this.trainersPerPage > this.trainerFilteredList.length) {
      this.actualTrainersPerPage = this.trainerFilteredList.length;
    }
    if (this.trainersPerPage === 0) {
      this.actualTrainersPerPage = this.trainerFilteredList.length;
      this.maxPages = 0;
      this.currentPage = 0;
    } else {
      this.actualTrainersPerPage = this.trainersPerPage;
      // update max page value
      this.maxPages = Math.ceil(
        this.trainerFilteredList.length / this.actualTrainersPerPage
      ) - 1;
      this.currentPage = Math.min(this.currentPage, this.maxPages);
      if(this.currentPage < 0){
        this.currentPage = 0;
      }
    }

    // find the number of trainers on the current page
    this.trainersOnThisPage = Math.min(
      this.trainerFilteredList.length -
        this.currentPage * this.actualTrainersPerPage,
      this.actualTrainersPerPage
    );
    this.updateSize();
  }

  // gets an updated list of batches
  updateBatches() {
    this.loading = true;
    if (this.batchList === null) {
      console.log("no batches loaded!");
      return;
    }
    for (const batch of this.batchList) {
      // TODO:
      //This probably needs some editing. Date is now a string. Is there a TO-DO in Typescript?
      //For some reason, it floors the day too hard and moves it back one.
      if (!Number(batch.startDate)) {
        batch.startDate = new Date(batch.startDate).valueOf() + this.ONE_WEEK/7;
        batch.endDate = new Date(batch.endDate).valueOf() + this.ONE_WEEK/7;
      }
    }

  }

  //Filter batches. TODO: Logic can probably be simplified.
  filterBatches() {
    this.batchFilteredList = [];
    for (const batch of this.batchList) {
      let filter = false;
      if (this.hideConcludedBatches) {
        filter = filter ? filter : new Date(batch.endDate).getTime() < Date.now();
      }
      if (this.curriculumFilter.name !== "Any") {

        filter = filter ? filter : batch.curriculum !== this.curriculumFilter.id;
      }
      if (this.locationFilter.name !== "Any") {
        filter = filter ? filter : batch.location !== this.locationFilter.id;
      }
      if (this.buildingFilter.name !== "Any") {
        filter = filter ? filter : batch.building !== this.buildingFilter.id;
      }
      if (!filter) {
        this.batchFilteredList.push(batch);
      }
    }
    this.filterTrainers()
  }

  filterConcludedBatches(batch: Batch) {
    if (new Date(batch.endDate).getTime() < Date.now()) {
      return true;
    }
    return false;
  }

  // gets the list of trainers
  updateTrainers() {
    this.loading = true;
  }

  //Filter trainers.
  filterTrainers() {
    this.trainerFilteredList = [];
    for (const trainer of this.trainerList) {
      let filter = false;
      if (this.hideBatchlessTrainers) {
        filter = filter ? filter : this.filterBatchlessTrainers(trainer);
      }
      if (this.hideInactiveTrainers) {
        filter = filter ? filter : this.filterInactiveTrainers(trainer);
      }
      if (!filter) {
        this.trainerFilteredList.push(trainer);
      }
    }
  }

  filterBatchlessTrainers(trainer: Trainer) {
    for (const batch of this.batchFilteredList) {
      if (batch.trainer === trainer.id) {
        return false;
      }
    }
    return true;
  }

  filterInactiveTrainers(trainer: Trainer) {
    return !trainer.isActive;
  }

  updateCurriculums() {

    //TODO make this accurate in terms of function

  }

  updateLocations() {
    this.locationList = this.locationListChild;
    this.locationList.sort((a, b) => a.id - b.id);
    if(this.buildingList !== null) {
      this.buildingList.forEach(buildings => {
        this.buildingList.sort((a, b) => a.id - b.id);

      });
    }
  }

  updateSettings() {
    this.settingControllerService.find().subscribe(result => {
      const setting = result;
      this.trainersPerPage = setting.trainersPerPage;
      this.updatePage();
    });
  }

  // updates the start and end date filters
  updateDateFilters() {
    this.startDate = new Date(this.startValue);
    this.endDate = new Date(this.endValue);
  }

  // sets size of the svg graphic to fit the screen
  updateSize() {
    // set width to be the same size as the trainernames div, as it scales with the page
    this.width = this.trainernamesElement.nativeElement.getBoundingClientRect().width;
    this.width = Math.max(this.minWidth, this.width);
    this.height = this.width * 2;

    // update column width
    const col_wid =
      (this.width - this.timescaleXOfs) / this.trainersOnThisPage - 5;
    this.columnWidth = Math.min(
      this.maxColumnWidth,
      Math.max(this.minColumnWidth, col_wid)
    );

    this.updateTodayLine();
  }

  // updates the line for today
  updateTodayLine() {
    // calculate position of today_line
    this.updateDateFilters();
    const y = this.dateToYPos(Date.now());
    this.todayLine = { x1: this.timescaleXOfs, x2: this.width, y1: y, y2: y };
  }

  // makes a simple object for a tooltip line for reuseablility
  getTooltipExists(text: string, value: string) {
    return [
      { text: text + ": ", color: this.tooltipDefaultColor },
      { text: value, color: this.tooltipMidSectionColor }
    ];
  }

  // sets the tooltip rect and tooltip data
  updateTooltip(batchid, mousepos) {
    // hide tooltip if zooming or mouse is out of range
    if (this.zooming || mousepos.y < 0) {
      this.tooltipActive = false;
      return;
    }

    // get batch from id
    batchid = batchid.toString().split("-")[1];
    let batch: Batch = null;
    for (let i = 0; i < this.batchFilteredList.length; i++) {
      const b = this.batchFilteredList[i];
      if (b.id.toString() === batchid) {
        batch = b;
        break;
      }
    }
    if (batch == null) {
      this.tooltipActive = false;
      return;
    }

    // only need to do setup once
    if (this.tooltipLastBatch !== batch) {
      this.tooltipLastBatch = batch;

      // create text that goes on the tooltip
      const lines = [];
      if (batch.curriculum != null) {
        lines.push([
          { text: this.getCurriculumNameById(batch.curriculum), color: this.tooltipTitleColor },
          { text: " Batch", color: this.tooltipDefaultColor }
        ]);
      }

      lines.push([{ text: "----------", color: this.tooltipDefaultColor }]);

      if (batch.trainer != null) {
        lines.push(this.getTooltipExists("Trainer", this.getTrainerNameById(batch.trainer)));
      }
      if (batch.cotrainer != null) {
        lines.push(this.getTooltipExists("Cotrainer", this.getTrainerNameById(batch.cotrainer)));
      }
      if (batch.startDate != null) {
        lines.push(
          this.getTooltipExists(
            "Start Date",
            new Date(batch.startDate).toDateString()
          )
        );
      }
      if (batch.endDate != null) {
        lines.push(
          this.getTooltipExists(
            "End Date",
            new Date(batch.endDate).toDateString()
          )
        );
      }

      lines.push([{ text: "----------", color: this.tooltipDefaultColor }]);

      if (batch.location != null) {
        lines.push(this.getTooltipExists("Location", this.getLocationNameById(batch.location)));
      }
      if (batch.building != null) {
        lines.push(this.getTooltipExists("Building", this.getBuildingNameById(batch.building)));
      }
      if (batch.room != null) {
        lines.push(this.getTooltipExists("Room", this.getRoomNameById(batch.room)));
      }

      // dynamic width
      let rectw = 250;
      // after lines have been set,
      setTimeout(() => {
        // find the longest line
        rectw = 0;
        const texts = this.tooltipTexts.toArray();
        for (let i = 0; i < texts.length; i++) {
          const ttwidth = texts[i].nativeElement.getBoundingClientRect().width;
          if (ttwidth > rectw) {
            rectw = ttwidth;
          }
        }
        if (rectw < 100) {
          // text wasnt loaded!
          return;
        }
        rectw += 6;
        this.tooltipRect.w = rectw;
      }, 0);

      // get positioning of the tooltip rect
      const recth = this.tooltipRect.linespacing * lines.length + 5;

      // update values
      this.tooltipData = lines;
      this.tooltipRect.w = rectw;
      this.tooltipRect.h = recth;
    }

    // set every time
    this.tooltipActive = true;
    const rectx = mousepos.x - this.tooltipRect.w / 2;
    let recty = mousepos.y - this.tooltipRect.h - 12;
    let tricentery = mousepos.y - 2;
    let tridir = -10;

    // flip tooltip if too high
    // get the rect top relative to the screen and trainernames sticky
    const screen_mouse_pos_y =
      mousepos.y +
      this.timelineRootElement.nativeElement.getBoundingClientRect().top -
      this.trainernamesElement.nativeElement.getBoundingClientRect().height;
    const screen_rel_rect_y = screen_mouse_pos_y - this.tooltipRect.h - 12;
    if (recty < 0 || screen_rel_rect_y < 0) {
      recty = mousepos.y + 15;
      tricentery = mousepos.y + 5;
      tridir = 10;
    }
    const triangle_points =
      mousepos.x -
      5 +
      "," +
      (tricentery + tridir) +
      " " +
      mousepos.x +
      "," +
      tricentery +
      " " +
      (mousepos.x + 5) +
      "," +
      (tricentery + tridir);

    this.tooltipRect.x = rectx;
    this.tooltipRect.y = recty;
    this.tooltipRect.triangle = triangle_points;

    // clear timeout
    if (this.tooltipTimeoutTimer != null) {
      clearTimeout(this.tooltipTimeoutTimer);
      this.tooltipTimeoutTimer = null;
    }
    this.tooltipSetThisFrame = true;
  }

  // called when mouse moves, and it may not be over a batch
  updateTooltipVisibility() {
    // if tooltip was not just set
    if (!this.tooltipSetThisFrame) {
      // and the tooltip is active, and the timer is not already set
      if (this.tooltipActive && this.tooltipTimeoutTimer == null) {
        // start timeout
        this.tooltipTimeoutTimer = setTimeout(() => {
          // hide the tooltip
          this.tooltipActive = false;
          this.tooltipTimeoutTimer = null;
        }, this.tooltipTimeoutDur);
      }
    }
    this.tooltipSetThisFrame = false;
  }

  getTrainerNameById(id:number){
    const index = this.trainerFilteredList.findIndex(t => t.id === id);
    return this.trainerFilteredList[index].firstName + " " +this.trainerFilteredList[index].lastName;
  }

  getLocationNameById(id: number) {
    const index = this.locationList.findIndex(t => t.id === id);
    if(this.locationList[index] != null){
      return this.locationList[index].name;
    }
    return "No Location exists."
  }

  getBuildingNameById(id: number) {
    const index = this.buildingList.findIndex(t => t.id === id);
    if(this.buildingList[index] != null){
      return this.buildingList[index].name;
    }
    return "No Building exists."
  }

  getRoomNameById(id: number) {

    return "No Room exists."
  }

  getCurriculumNameById(id: number) {
    const index = this.curriculumList.findIndex(t => t.id === id);
    if(this.curriculumList[index] != null){
      return this.curriculumList[index].name;
    }
    return "No Curriculum exists."
  }

  // returns the appropriate color for the core curriculum type
  getColorForcurriculum(currId: number) {
    let color = "";
    switch (currId) {
      case 1:
        color = "#1c77b4"; // java
        break;
      case 2:
        color = "#ff7f0e"; // .net
        break;
      case 3:
        color = "#aec7e8"; // sdet
        break;
      case 105:
        color = "#ffbb78"; // custom
        break;
      default:
        color = "#dddddd"; // other
        break;
    }
    return color;
  }

  // returns the list of rectangles that represent each batch
  getBatchesRectangles() {
    const rects = [];
    // no batches
    if (this.batchFilteredList.length === 0) {
      return rects;
    }


    // text mode to use by pixel height
    const txtlongpx = 105;
    const txtshortpx = 30;
    const txtnumpx = 0;
    // make a rectangle for each batch
    for (let i = 0; i < this.batchFilteredList.length; i++) {
      const batch: Batch = this.batchFilteredList[i];
      // valueOf gives us ms, convert to weeks to get the duration this event takes
      let duration = batch.endDate - batch.startDate;
      duration = Math.floor(duration / this.ONE_WEEK);

      // get the correct color
      const color = this.getColorForcurriculum(batch.curriculum);

      // get the column this batch will be in
      let trainer_index = this.trainerFilteredList.findIndex(
        t => t.id === batch.trainer
      );
      if (trainer_index < 0) {
        // this batch has no trainer, it may have been filtered
        continue;
      }
      // only show batches on this page
      trainer_index -= this.currentPage * this.actualTrainersPerPage;
      if (trainer_index < 0 || trainer_index >= this.trainersOnThisPage) {
        continue;
      }

      // TODO: set width dynamically?
      const w = 25;

      // get the top left position of the rectangle
      const x =
        this.swimlaneXOfs +
        trainer_index * this.columnWidth +
        (this.columnWidth - w) * 0.5;
      const y = this.dateToYPos(batch.startDate);
      // calculate height from the top and bottom of the rectangle
      const endy = this.dateToYPos(batch.endDate);
      const h = endy - y;

      // change label based on height of rectangle
      const labelx = x + w * 0.25;
      let labely;
      let labeltext = "";
      if (h > txtlongpx) {
        // spell out weeks
        labeltext = "WEEKS";
        labely = y + 25;
      } else if (h > txtshortpx) {
        // only have number and w
        labeltext = "W";
        labely = y + 15;
      } else if (h >= txtnumpx) {
        // only number
        labeltext = "";
        labely = y - 2;
      } else {
        continue;
      }
      // get the text that will be put into the rectangle
      const label = duration
        .toString()
        .split(" ")
        .concat(labeltext.split(""));

      rects.push({
        x: x,
        y: y,
        w: w,
        h: h,
        id: "batch-" + batch.id,
        label: label,
        labelx: labelx,
        labely: labely,
        color: color
      });
    }
    return rects;
  }

  // returns a list of the lines that seperate columns
  getSwimlanes() {
    const lines = [];
    // make 1 more swimlane than the amount of trainers
    for (let i = 0; i < this.trainersOnThisPage + 1; i++) {
      const xpos = this.swimlaneXOfs + i * this.columnWidth;
      lines.push({
        x1: xpos,
        y1: this.swimlaneYOfs,
        x2: xpos,
        y2: this.height - this.swimlaneYOfs
      });
    }
    return lines;
  }

  // get lines that run between the batches
  getBatchLanes() {
    const lines = [];
    for (let i = 0; i < this.trainersOnThisPage; i++) {
      const xpos = this.swimlaneXOfs + (i + 0.5) * this.columnWidth;
      lines.push({
        x1: xpos,
        y1: this.swimlaneYOfs,
        x2: xpos,
        y2: this.height
      });
    }
    return lines;
  }

  // get durations between batches and their positions
  getBreaks() {
    // batches seperated by trainer
    const trainerBatches = [];
    for (let i = 0; i < this.trainerFilteredList.length; i++) {
      const batchSet = [];
      for (let j = 0; j < this.batchFilteredList.length; j++) {
        if (
          this.batchFilteredList[j].trainer === this.trainerFilteredList[i].id
        ) {
          batchSet.push(this.batchFilteredList[j]);
        }
      }
      trainerBatches.push(batchSet);
    }
    // reorder them by increasing start date
    for (let k = 0; k < trainerBatches.length; k++) {
      trainerBatches[k].sort(function(a, b) {
        return a.startDate - b.startDate;
      });
    }
    const midPoints = [];
    for (let l = 0; l < trainerBatches.length; l++) {
      const xindex = l - this.actualTrainersPerPage * this.currentPage;
      if (xindex < 0 || xindex >= this.trainersOnThisPage) {
        continue;
      }
      const xpos = this.swimlaneXOfs + (xindex + 0.5) * this.columnWidth + 5;
      if (trainerBatches[l].length > 1) {
        for (let m = 0; m < trainerBatches[l].length - 1; m++) {
          const gap =
            trainerBatches[l][m + 1].startDate - trainerBatches[l][m].endDate;
          const duration = Math.floor(gap / this.ONE_WEEK);
          const midDate = trainerBatches[l][m].endDate + gap / 2;
          const y = this.dateToYPos(midDate);
          midPoints.push({ duration: duration, xPos: xpos, midDatePos: y });
        }
      }
    }
    return midPoints;
  }

  // returns the list of trainers with their positions
  getTrainers() {
    const spacing = 2;
    const width = this.columnWidth - spacing;

    // if there are no trainers, show it
    if (this.trainerFilteredList.length === 0) {
      return [{ name: "No trainers", left: spacing, width: this.minWidth }];
    }

    // add each trainer and position to array
    const trainerspos = [];
    for (let i = 0; i < this.trainersOnThisPage; i++) {
      const trainer = this.trainerFilteredList[
        this.actualTrainersPerPage * this.currentPage + i
      ];
      if (!trainer) break;

      // get trainer name
      const name = `${trainer.firstName} ${trainer.lastName[0]}.`;
      // get left offset of this trainer
      let left = spacing;
      if (i === 0) {
        left += this.swimlaneXOfs;
      }
      trainerspos.push({ name: name, left: left, width: width });
    }

    return trainerspos;
  }

  // returns the list of months to display and their position
  getTimescale() {
    if (!this.timescaleEnabled) {
      return [];
    }
    // cache some common values
    const start_month = this.startDate.getMonth();
    const start_year = this.startDate.getFullYear();

    // get distance between months (px) to determine which scale to use
    const ys0 = this.dateToYPos(new Date(start_year, start_month).valueOf());
    const ys1 = this.dateToYPos(
      new Date(start_year, start_month + 1).valueOf()
    );
    const dist_between_months = ys1 - ys0;

    // the maximum number of dates to be shown on the screen
    const max_dates = 40;

    // min value for dist_between_months to be for that scale
    // numbers magically determined from trial and error
    const pxdays = 1900;
    const px2days = 800;
    const pxweeks = 300;
    const pxmonths = 100;
    const pxquarters = 30;
    const pxyears = 6;
    const px2years = 2;
    const px5years = 1;
    const px10years = 0;

    // create an array of all the dates to be shown and determine the naming style
    const dates: Date[] = [];
    let namestyle = "month";
    if (dist_between_months > pxdays) {
      // show in days
      namestyle = "day";
      for (let i = 0; i < max_dates; i++) {
        dates.push(
          new Date(start_year, start_month, this.startDate.getDate() + i)
        );
      }
    } else if (dist_between_months > px2days) {
      // show in 2 days
      namestyle = "day";
      const aligned_start_date_2 =
        this.startDate.getDate() - (this.startDate.getDate() % 2);
      for (let i = 0; i < max_dates; i++) {
        dates.push(
          new Date(start_year, start_month, aligned_start_date_2 + i * 2)
        );
      }
    } else if (dist_between_months > pxweeks) {
      // show in weeks
      namestyle = "month";
      // todo always show month day 0 and year month 0
      for (let i = 0; i < max_dates; i++) {
        dates.push(new Date(start_year, start_month, i * 7));
      }
    } else if (dist_between_months > pxmonths) {
      // show in months
      namestyle = "month";
      for (let i = 0; i < max_dates; i++) {
        dates.push(new Date(start_year, start_month + i));
      }
    } else if (dist_between_months > pxquarters) {
      // show in quarters
      namestyle = "month";
      for (let i = 0; i < max_dates; i++) {
        dates.push(new Date(start_year, i * 3));
      }
    } else if (dist_between_months > pxyears) {
      // show in years
      namestyle = "year";
      for (let i = 0; i < max_dates; i++) {
        dates.push(new Date(start_year + i, 0));
      }
    } else if (dist_between_months > px2years) {
      // show in 2 years
      namestyle = "year";
      const aligned_start_year = start_year - (start_year % 2);
      for (let i = 0; i < max_dates; i++) {
        dates.push(new Date(aligned_start_year + i * 2, 0));
      }
    } else if (dist_between_months > px5years) {
      // show in 5 years
      namestyle = "year";
      const aligned_start_year = start_year - (start_year % 5);
      for (let i = 0; i < max_dates; i++) {
        dates.push(new Date(aligned_start_year + i * 5, 0));
      }
    } else if (dist_between_months > px10years) {
      // show in 10 years
      namestyle = "year";
      const aligned_start_year = start_year - (start_year % 10);
      for (let i = 0; i < max_dates; i++) {
        dates.push(new Date(aligned_start_year + i * 10, 0));
      }
    } else {
      return null;
    }

    // go through all the dates that were just created to apply the naming style and calculate the position
    const timescale = [];
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      // apply naming style - day, month, or year
      let name = "name " + i;
      switch (namestyle) {
        case "day":
          if (date.getDate() === 1) {
            name = this.fullMonthNames[date.getMonth()];
          } else {
            name = this.dayOfWeekNames[date.getDay()];
            name += " " + date.getDate();
          }
          break;
        case "month":
          if (date.getDate() === 1) {
            name = this.fullMonthNames[date.getMonth()];
          } else {
            name = this.shortMonthNames[date.getMonth()];
            name += " " + date.getDate();
          }
          break;
        case "year":
          name = "" + date.getFullYear();
          break;
      }
      // replace jan 0 with the year
      if (date.getMonth() === 0 && date.getDate() === 1) {
        name = "" + date.getFullYear();
      }
      // calculate the position of the text
      const y = this.swimlaneYOfs + this.dateToYPos(date.valueOf());
      if (y < this.swimlaneYOfs) {
        continue;
      } else if (y > this.height - this.swimlaneYOfs) {
        break;
      }
      const x = this.timescaleXOfs - 5;
      timescale.push({ name: name, x: x, y: y });
    }
    return timescale;
  }

  // returns the pixel value on the vertical axis this date would appear on the timeline
  dateToYPos(dateValue: number) {
    return (
      ((dateValue - this.startValue) / (this.endValue - this.startValue)) *
      this.height
    );
  }

  // returns the date value from the vertical axis position on the timeline
  yPosToDate(ypos: number) {
    return (
      (ypos * (this.endValue - this.startValue)) / this.height + this.startValue
    );
  }

  startZoom(mouseposy: number) {
    // calculate values needed for zooming from the mousepos
    this.zoomingFrom = mouseposy;
    this.zoomingLine = {
      x1: this.timescaleXOfs,
      x2: this.width,
      y1: mouseposy,
      y2: mouseposy
    };
    // position (px) to date
    this.zoomingFromDate = this.yPosToDate(mouseposy);
    // get duration before and after zoom line
    this.preZoomBeforeDuration = this.zoomingFromDate - this.startValue;
    this.preZoomAfterDuration = this.endValue - this.zoomingFromDate;
    this.zooming = true;

    // hide tooltip
    this.tooltipActive = false;
  }

  zoomBy(amount: number) {
    // must be zooming to zoom
    if (!this.zooming) {
      return;
    }
    // scale the durations before and after the zoom line
    const newBeforeDuration = this.preZoomBeforeDuration * amount;
    let newStart = this.zoomingFromDate - newBeforeDuration;
    const newAfterDuration = this.preZoomAfterDuration * amount;
    let newEnd = this.zoomingFromDate + newAfterDuration;
    if (newEnd - newStart < this.minZoom || newEnd - newStart > this.maxZoom) {
      newStart = this.startValue;
      newEnd = this.endValue;
    }
    if (newStart >= newEnd) {
      return;
    }
    // set start and end dates
    this.startValue = newStart;
    this.endValue = newEnd;
    this.updateTodayLine();
  }

  finishZoom() {
    // TODO: undo support?
    this.zooming = false;
  }

  shiftBy(amount: number) {
    const dur = this.endValue - this.startValue;
    const shiftBy = amount * dur;
    this.startValue = this.startValue + shiftBy;
    this.endValue = this.endValue + shiftBy;
    this.updateTodayLine();
  }

  // start zoom at mouse pos on mousedown
  bgmousedown(event: MouseEvent) {
    if (this.zoomingEnabled) {
      const mx =
        event.clientX -
        this.timelineRootElement.nativeElement.getBoundingClientRect().left;
      const my =
        event.clientY -
        this.timelineRootElement.nativeElement.getBoundingClientRect().top;
      if (mx <= this.timescaleXOfs) {
        this.shifting = true;
      } else {
        this.startZoom(my);
      }
    }
  }
  // finish zoom on mouseup
  bgmouseup(event: MouseEvent) {
    this.finishZoom();
    this.shifting = false;
  }
  // hide popup and update zoom by delta on mouse move
  bgmousemove(event: MouseEvent) {
    const my =
      event.clientY -
      this.timelineRootElement.nativeElement.getBoundingClientRect().top;
    const mx =
      event.clientX -
      this.timelineRootElement.nativeElement.getBoundingClientRect().left;
    const mdy = event.movementY;
    if (this.shifting) {
      event.preventDefault();
      // stop shifting if mouse is up (happens when mouse is released outside of the timeline and returns)
      if (event.buttons !== 1) {
        this.shifting = false;
      }
      // get the factor to zoom by from the relative mouse position
      const shiftFactor = -mdy / this.height;
      this.shiftBy(shiftFactor);
    }
    if (this.zooming) {
      event.preventDefault();
      // stop zooming if mouse is up (happens when mouse is released outside of the timeline and returns)
      if (event.buttons !== 1) {
        this.finishZoom();
      }
      // get the factor to zoom by from the relative mouse position
      const dy = my - this.zoomingFrom;
      let zoomFactor = dy * this.zoomScale;
      zoomFactor = Math.pow(2, zoomFactor);
      this.zoomBy(zoomFactor);
    }
    this.updateTooltipVisibility();
    if (
      this.width !==
      this.trainernamesElement.nativeElement.getBoundingClientRect().width
    ) {
      this.updateSize();
    }
  }

  // show tooltip at mouse on mouse move on batch
  batchmousemove(event) {
    const x =
      event.clientX -
      this.timelineRootElement.nativeElement.getBoundingClientRect().left;
    const y =
      event.clientY -
      this.timelineRootElement.nativeElement.getBoundingClientRect().top;
    this.updateTooltip(event.target.id, { x: x, y: y });
  }

  // window has been resized, update timeline
  windowResize(event) {
    this.updateSize();
  }
}
