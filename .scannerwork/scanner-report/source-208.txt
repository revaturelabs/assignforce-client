import { AddressControllerService } from './../../services/api/address-controller/address-controller.service';
import { TrainerControllerService } from './../../services/api/trainer-controller/trainer-controller.service';
import { CurriculumControllerService } from './../../services/api/curriculum-controller/curriculum-controller.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from './../../../../node_modules/rxjs/observable/from';

import { AppMaterialModule } from '../../material.module';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { OverviewComponent } from './overview.component';
import { UrlService } from '../../services/url/url.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { FillSkillsService } from '../../services/api/skill-controller/fill-skills.service';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';

import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { Address } from '../../model/Address';
import { Batch } from '../../model/Batch';
import { Observable} from 'rxjs/Observable';
import { Building } from '../../model/Building';
import { Room } from '../../model/Room';
import { of } from 'rxjs/observable/of';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { Curriculum } from '../../model/Curriculum';
import { Trainer } from '../../model/Trainer';
import { DatePipe } from '@angular/common';
//use jest to create a auto mock of Angular5Csv
jest.mock('angular5-csv/dist/Angular5-csv');

const locationService = {
  findAll: jest.fn().mockImplementation(() => {
    const addresses: Address[] =[
      {
        "id": 1,
        "name": "Revature HQ",
        "city": "Reston",
        "state": "VA",
        "isActive": true,
        "buildings": []
      },
      {
        "id": 2,
        "name": "Tempe",
        "city": "ASU",
        "state": "AZ",
        "isActive": true,
        "buildings": []
      }
    ];
    return of(addresses);
  })
};

const batchService = {
  findAll: jest.fn().mockImplementation(() => {
    const batches: Batch[] = [
      {
        "id": 740,
        "name": "1803 Mar12 .NET",
        "startDate": new Date("2018-04-11").getTime(),
        "endDate": new Date("2018-06-17").getTime(),
        "curriculum": 2,
        "trainer": null,
        "cotrainer": null,
        "skills": [
          
        ],
        "location": 1,
        "building": 1,
        "room": 7,
        "classSize": 21
      },
      {
        "id": 739,
        "name": "1803 Mar12 .NET",
        "startDate": new Date("2018-04-11").getTime(),
        "endDate": new Date("2018-06-17").getTime(),
        "curriculum": 174,
        "trainer": 1,
        "cotrainer": 2,
        "skills": [
          
        ],
        "location": 1,
        "building": 1,
        "room": 7,
        "classSize": 21
      },
    ];
    return of(batches);
  })
};

const buildingService = {
  findAll: jest.fn().mockImplementation(() => {
    const buildings: Building[] = [
      {
        "buildingId": 1,
        "isActive": true,
        "buildingName": "11730 Plaza American Drive (HQ)",
        "address": 1,
        "rooms": []
      },
      {
        "buildingId": 2,
        "isActive": true,
        "buildingName": "ASU Building 1",
        "address": 2,
        "rooms": []
      }
    ];
    return of(buildings);
  })
};

const roomService = {
  findAll: jest.fn().mockImplementation(() => {
    const rooms: Room[] = [
      {
        "id": 7,
        "roomName": "208",
        "building": 1,
        "active": true,
        "unavailabilities": []
      },
      {
        "id": 1,
        "roomName": "201",
        "building": 1,
        "active": true,
        "unavailabilities": []
      }
    ];
    return of(rooms);
  })
};

const curriculumService = {
  findAll: jest.fn().mockImplementation(() => {
    const curricula: Curriculum[] = [
      {
        "id": 174,
        "name": "tyuhgf",
        "isActive": false,
        "isCore": true,
        "skills": []
      },
      {
        "id": 2,
        "name": ".NET",
        "isActive": true,
        "isCore": true,
        "skills": []
      }
    ];
    return of(curricula);
  })
};

const trainerService = {
  findAll: jest.fn().mockImplementation(() => {
    const trainers: Trainer[] = [
      {
        "id": 1,
        "firstName": "August",
        "lastName": "Duet",
        "isActive": true,
        "preferredLocation": 1,
        "unavailabilities": [
          
        ],
        "email": "August.Duet@revature.com",
        "skills": [],
        "certifications": [
          
        ],
        "resume": null,
        "linkedInUrl": null
      },
      {
        "id": 2,
        "firstName": "Fred",
        "lastName": "Belotte",
        "isActive": true,
        "preferredLocation": null,
        "unavailabilities": [
          
        ],
        "email": "Fred.Belotte@revature.com",
        "skills": [],
        "certifications": [
          
        ],
        "resume": null,
        "linkedInUrl": null
      }
    ];
    return of(trainers);
  })
}

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        { provide: AddressControllerService, useValue: locationService },
        { provide: BuildingControllerService, useValue: buildingService },
        { provide: BatchControllerService, useValue: batchService },
        { provide: RoomControllerService, useValue: roomService },
        { provide: CurriculumControllerService, useValue: curriculumService },
        { provide: TrainerControllerService, useValue: trainerService},
        UrlService,
        CachedObjectsService,
        FillSkillsService,
        SkillControllerService,
        FocusControllerService
      ],
      declarations: [OverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the location service findAll', () => {
    expect(locationService.findAll).toHaveBeenCalled();
  });

  it('should call the batch service findAll', async(() => {
    expect(batchService.findAll).toHaveBeenCalled();
  }));
  
  it('should call the building service findAll', () => {
    expect(buildingService.findAll).toHaveBeenCalled();
  });

  it('should call the room service findAll', () => {
    expect(roomService.findAll).toHaveBeenCalled();
  });

  it('should call the curriculum service findAll', () => {
    expect(curriculumService.findAll).toHaveBeenCalled();
  });

  it('should call the trainer service findAll', () => {
    expect(trainerService.findAll).toHaveBeenCalled();
  });

  it('should set addressList', () => {
    expect(component.addressList.length).toBeGreaterThan(0);
  });

  it('should set batchList', () => {
    expect(component.batchList.length).toBeGreaterThan(0);
  });

  it('should set curriculumList', () => {
    expect(component.curriculumList.length).toBeGreaterThan(0);
  });

  it('should set buildingsList', () => {
    expect(component.buildingsList.length).toBeGreaterThan(0);
  });

  it('should set roomsList', async(() => {
    expect(component.roomsList.length).toBeGreaterThan(0);
  }));

  it('should set trainerList', () => {
    expect(component.trainerList.length).toBeGreaterThan(0);
  });

  it('should display the batch name in b-name-cell', () => {
    const name = fixture.nativeElement.querySelectorAll('.b-name-cell')[0].textContent;
    expect(name).toContain(component.batchList[0].name);
  });

  it('should display the curriculum name in b-curriculum-cell', async(() => {
    const name = fixture.nativeElement.querySelectorAll('.b-curriculum-cell')[0].textContent;
    expect(name).toContain(component.curriculumList[1].name);
  }));

  it('should display the building name in b-building-cell', () => {
    const name = fixture.nativeElement.querySelectorAll('.b-building-cell')[0].textContent;
    expect(name).toContain(component.buildingsList[0].buildingName);
  });

  it('should display the room name in b-room-cell', () => {
    const name = fixture.nativeElement.querySelectorAll('.b-room-cell')[0].textContent;
    expect(name).toContain(component.roomsList[1].roomName);
  });

  it('should display the trainer name in b-trainer-cell', () => {
    const name = fixture.nativeElement.querySelectorAll('.b-trainer-cell')[0].textContent;
    expect(name).toContain(`${component.trainerList[0].firstName} ${component.trainerList[0].lastName}`);
  });

  it('should display the cotrainer name in b-cotrainer-cell',() => {
    const name = fixture.nativeElement.querySelectorAll('.b-cotrainer-cell')[0].textContent;
    expect(name).toContain(`${component.trainerList[1].firstName} ${component.trainerList[1].lastName}`)
  });

  it('should display the address name in b-location-cell', () => {
    const name = fixture.nativeElement.querySelectorAll('.b-location-cell')[0].textContent;
    expect(name).toContain(component.addressList[0].name);
  });

  it('should display the start date in b-sdate-cell', () => {
    const date = fixture.nativeElement.querySelectorAll('.b-sdate-cell')[0].textContent;
    const dp = new DatePipe('en-US');
    expect(date).toContain(dp.transform(new Date("2018-04-11").getTime()));
  });

  it('should display the end date in b-edate-cell', () => {
    const date = fixture.nativeElement.querySelectorAll('.b-edate-cell')[0].textContent;
    const dp = new DatePipe('en-US');
    expect(date).toContain(dp.transform(new Date("2018-06-17").getTime()));
  });

  it('it should display a progress bar', () => {
    expect(fixture.nativeElement.querySelectorAll('.b-progress-cell')[0]).toBeTruthy();
  });

  it('should compute weeks', () => {
    const date1 = new Date(2018, 3, 1).valueOf();
    const date2 = new Date(2018, 4, 1).valueOf();
    expect(component.computeNumOfWeeksBetween(date1, date2)).toEqual(4);
  });

  it('should not compute to be negative', () => {
    const date1 = new Date(2018, 4, 1).valueOf();
    const date2 = new Date(2018, 2, 1).valueOf();
    expect(component.computeNumOfWeeksBetween(date1, date2)).toEqual(8);
  });

  it('current week should be positive', () => {
    const date1 = new Date(2017, 4, 1).valueOf();
    expect(component.getCurrentWeekOfBatch(date1)).toBeGreaterThan(0);
  });

  it('current week should be negative', () => {
    const date1 = new Date(9999, 4, 1).valueOf();
    expect(component.getCurrentWeekOfBatch(date1)).toBeLessThan(0);
  });

  it('progress should not be 0', () => {
    const batch = {
      startDate: new Date(0, 0, 0).valueOf(),
      endDate: new Date(1, 1, 1).valueOf()
    };
    expect(component.getCurrentProgress(batch)).toBeGreaterThan(0);
  });

  it('progress should be 0', () => {
    const batch = {
      startDate: new Date(9998, 0, 0).valueOf(),
      endDate: new Date(9999, 1, 1).valueOf()
    };
    expect(component.getCurrentProgress(batch)).toEqual(0);
  });

  it('progress should be still be 0', () => {
    const batch = {
      startDate: new Date(9990, 0, 0).valueOf(),
      endDate: new Date(9999, 0, 0).valueOf()
    };
    expect(component.getCurrentProgress(batch)).toEqual(0);
  });

  it('should use Angular5Csv to export csv', () => {
    component.exportToCSV({stopPropagation: () => {}});
    expect(Angular5Csv).toHaveBeenCalled();
  });
});
