import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { Curriculum } from '../../model/Curriculum';
import { Trainer } from '../../model/Trainer';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { Building } from '../../model/Building';
import { Room } from '../../model/Room';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { FillSkillsService } from '../../services/api/skill-controller/fill-skills.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { Address } from '../../model/Address';
import { Batch } from '../../model/Batch';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OverviewComponent implements OnInit, AfterViewInit {
  // ----------------------- NEW CODE FROM NEW HOPE -----------------------------------
  selectedFilter: number;
  filteredYear: string;
  panelTitle = 'Loading...';
  isLoading: boolean;
  batchList: any[] = [];
  curriculumList: Curriculum[] = [];
  trainerList: Trainer[] = [];
  addressList: any[] = [];
  buildingsList: Building[] = [];
  roomsList: Room[] = [];
  displayedBatchList: any[];
  displayedColumns = [
    'name',
    'curriculum',
    'trainer',
    'cotrainer',
    'location',
    'building',
    'room',
    'startDate',
    'endDate',
    'progress'
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  batchDropYearFilterObjs: Map<string, any> = new Map<string, any>();

  constructor(
    private batchController: BatchControllerService,
    private curriculumServce: CurriculumControllerService,
    private trainerService: TrainerControllerService,
    private addressService: AddressControllerService,
    private cacheService: CachedObjectsService,
    private fillSkills: FillSkillsService,
    private buildingController: BuildingControllerService,
    private roomController: RoomControllerService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    // ------- Populating batch list data --------
    this.batchController.findAll().subscribe(
      blist => {
        this.batchList = blist;
        this.batchList.sort((a, b) => a.id - b.id);
        this.batchList.forEach(b => {
          b.progress = this.getCurrentProgress(b);
          const year = new Date(b.startDate).getFullYear().toString();
          this.batchDropYearFilterObjs.set(year, null);
        });
        this.applyFilter(this.batchDropYearFilterObjs.keys().next().value, 0);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.panelTitle = 'Could Not Load Batches';
        console.log(error);
      }
    );

    this.trainerService.findAll().subscribe(trainers => {
      this.trainerList = trainers;
      this.trainerList.sort((a, b) => a.id - b.id);
    });

    this.curriculumServce.findAll().subscribe(cList => {
      this.curriculumList = cList;
      this.curriculumList.sort((a, b) => a.id - b.id);
    });

    this.fillSkills.setList('trainer', () => {
      this.trainerList = this.fillSkills.objs;
      this.trainerList.sort((a, b) => a.id - b.id);
      this.cacheService.setTrainers(this.trainerList);
    });

    this.addressService.findAll().subscribe(lList => {
      this.addressList = lList;
      this.addressList.sort((a, b) => a.id - b.id);
      this.buildingController.findAll().subscribe(buildings => {
        this.buildingsList = buildings;
        this.buildingsList.sort((a, b) => a.buildingId - b.buildingId);
        this.roomController.findAll().subscribe(rooms => {
          this.roomsList = rooms;
          this.roomsList.sort((a, b) => a.id - b.id);
        });
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // -------------------------------- PREVIOUS BATCH'S METHODS -------------------------------------------
  exportToCSV(evt) {
    evt.stopPropagation();
    const mappedBatches = this.batchList.map(batch=> {
      const newBatch = {};
      const curriculum = this.curriculumList.find(c => c.id === batch.curriculum);
      const trainer = this.trainerList.find(t => t.id === batch.trainer);
      const cotrainer = this.trainerList.find(t1 => t1.id === batch.cotrainer);
      const location = this.addressList.find(l => l.id === batch.location);
      const building = this.buildingsList.find(b => b.buildingId === batch.building);
      const room = this.roomsList.find(r => r.id === batch.room);
      const startDate = new Date(batch.startDate).toLocaleDateString();
      const endDate = new Date(batch.endDate).toLocaleDateString();
      newBatch['id'] = batch.id;
      newBatch['name'] = batch.name;

      newBatch['curriculum'] = curriculum ? curriculum.name : '';
      newBatch['trainer'] = trainer ? `${trainer.firstName} ${trainer.lastName}`: '';
      newBatch['cotrainer'] = cotrainer ? `${cotrainer.firstName} ${cotrainer.lastName}` : '';

      newBatch['location'] = location ? location.name : '';
      newBatch['building'] = building ? building.buildingName : '';
      newBatch['room'] = room ? room.roomName : '';

      newBatch['startDate'] = startDate;
      newBatch['endDate'] = endDate;
      return newBatch;
    });
  }

  openMenu(evt) {
    evt.stopPropagation();
  }
  // --------------------------------- END OF THE OLD -----------------------------------------------------

  // ----------------------------------BEGIN OPERATION NEW HOPE -------------------------------------------
  applyFilter(filterYear: string, filterType: number) {
    let displayedBatchList = [];
    if(!filterYear || !(filterType >= 0)) {
      console.log(`Can\'t filter without filter inputs: filterYear=${filterYear}, filterType=${filterType}`);
      return 
    }
    if(filterYear) {
      this.filteredYear = filterYear;
      displayedBatchList = this.batchList.filter(batch => {
        const year = new Date(batch.startDate).getFullYear().toString();
        return year === filterYear;
      })
    }

    /**
     *  FILTER TYPE!!!
     *  0 - By All
     *  1 - In Progress
     *  2 - Beginning in two weeks
     */
    if (filterType >= 0) {
      this.selectedFilter = filterType;
      if(filterType === 0) {
        this.panelTitle = `All Batches for ${this.filteredYear}`
      } else if (filterType === 1) {
        displayedBatchList = displayedBatchList.filter(batch => batch.progress > 0 && batch.progress < 100);
        this.panelTitle = `Batches In Progress for ${this.filteredYear}`;
      } else if (filterType === 2) {
        displayedBatchList = displayedBatchList.filter(batch => {
          const weekNumber = this.getCurrentWeekOfBatch(batch.startDate);
          return weekNumber >= -2 && weekNumber < 0;
        });
        this.panelTitle = `Batches Starting Soon for ${this.filteredYear}`
      }
    }
    this.dataSource.data = displayedBatchList;
  }

  computeNumOfWeeksBetween(startDate: number, endDate: number): number {
    // EX: 0-6 DAYS = 1 WEEK
    //     7-13 DAYS = 2 WEEKS
    const startValue = new Date(startDate).valueOf();
    const endValue = new Date(endDate).valueOf();
    if (startValue && endValue) {
      const numberOfDays = Math.abs(<any>startValue - <any>endValue) / (1000 * 60 * 60 * 24);
      const numberOfWeeks = Math.floor(numberOfDays / 7);
      return numberOfWeeks;
    }
    return 0;
  }

  // IF RETURN IS POSITIVE, BATCH HAS STARTED/IS IN SESSION FOR # WEEKS.
  // IF RETURN IS NEGATIVE, BATCH HAS NOT STARTED/WILL START IN # WEEKS.
  getCurrentWeekOfBatch(startDate: number): number {
    const currentDate = new Date(Date.now()).valueOf();
    const startValue = new Date(startDate).valueOf();
    const numberOfDays = (currentDate - startValue) / (1000 * 60 * 60 * 24);
    const weekNumber = Math.floor(numberOfDays / 5);
    return weekNumber;
  }

  // PROGRESS = 0 IF BATCH DIDNT START YET
  // PROGRESS CAPPED AT 100 IF BATCH FINISHED
  getCurrentProgress(batchObj): number {
    const training_duration = this.computeNumOfWeeksBetween(batchObj.startDate, batchObj.endDate);
    if (training_duration === 0) {
      return 100;
    }
    const batch_current_week = this.getCurrentWeekOfBatch(batchObj.startDate);
    if (batch_current_week <= 0) {
      return 0;
    }
    let progress = batch_current_week / training_duration;
    progress = progress * 100;
    if (progress > 100) {
      return 100;
    }
    return progress;
  }

  findCurriculum(id: number): Curriculum {
    let c: Curriculum = null;

    c = this.curriculumList.find(curr => curr.id === id);

    return c;
  }

  findTrainer(id: number): Trainer {
    let t: Trainer = null;
    t = this.trainerList.find(trainer => trainer.id === id);
    return t;
  }

  findLocation(id: number, bName: string): Address {
    let a: Address = null;
    a = this.addressList.find(address => address.id === id);
    return a;
  }

  findBuilding(id: number): Building {
    let b: Building = null;
    b = this.buildingsList.find(building => building.buildingId === id);
    return b;
  }

  findRoom(id: number): Room {
    let r: Room = null;
    r = this.roomsList.find(room => room.id === id);
    return r;
  }

  arrayFromMap(map: Map<any, any>) {
    return Array.from(map.keys()).sort();
  }
}
