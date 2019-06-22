import { TestBed, inject } from '@angular/core/testing';
import { Building } from '../../../model/Building';
import { BuildingControllerService } from './building-controller.service';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AddressControllerService } from '../address-controller/address-controller.service';
import { environment } from '../../../../environments/environment';

describe('BuildingControllerService', () => {
  let httpTestingController: HttpTestingController;
  let buildingControllerService: BuildingControllerService;
  let buildingData: Building[];
  const buildingApi = environment.apiUrls.buildingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingControllerService, HttpClient]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    buildingControllerService = TestBed.get(BuildingControllerService);
    buildingData = [
      {
        "buildingId": 64,
        "isActive": true,
        "address": 45,
        "rooms": [],
        "buildingName": "Chicago",
        "id": 64
      },
      {
        "buildingId": 2,
        "isActive": true,
        "address": 2,
        "rooms": [],
        "buildingName": "ASU Building 1",
        "id": 2
      },
      {
        "buildingId": 21,
        "isActive": true,
        "address": 3,
        "rooms": [],
        "buildingName": "SPS",
        "id": 21
      },
      {
        "buildingId": 3,
        "isActive": true,
        "address": 3,
        "rooms": [],
        "buildingName": "Queens",
        "id": 3
      },
      {
        "isActive": true,
        "address": 5,
        "rooms": [],
        "buildingName": "Detroit",
        "buildingId": 65,
        "id": 65
      },
      {
        "buildingId": 1,
        "isActive": true,
        "address": 1,
        "rooms": [],
        "buildingName": "11730 Plaza American Drive (HQ)",
        "id": 1
      },
      {
        "isActive": true,
        "buildingId": 66,
        "buildingName": "Muma",
        "rooms": [],
        "address": 66,
        "id": 66
      },
      {
        "isActive": true,
        "buildingId": 68,
        "buildingName": "Johnson Center",
        "rooms": [],
        "address": 67,
        "id": 68
      },
      {
        "isActive": true,
        "buildingId": 69,
        "buildingName": "NEC",
        "rooms": [],
        "address": 66,
        "id": 69
      },
      {
        "isActive": true,
        "buildingId": 70,
        "buildingName": "Enterprise",
        "rooms": [],
        "address": 67,
        "id": 70
      }
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([BuildingControllerService], (service: BuildingControllerService) => {
    expect(service).toBeTruthy();
  }));

  //create
  it('should create a new building', () => {
    let newBuilding: Building = {buildingId: 71, isActive: true, buildingName: 'IQ', rooms: [], address: 68,id: 71};
    buildingControllerService.create(newBuilding).subscribe(resp => {
      expect(resp).toEqual(newBuilding);
    });
    let req = httpTestingController.expectOne(buildingApi.baseUrl + buildingApi.create);
    expect(req.request.method).toBe('POST');
    buildingData.push(req.request.body);
    let dataSize = buildingData.length;
    req.flush(buildingData[dataSize-1]);
  });
  
  //update
  it('should update an existing building', () => {
    let updatedBuilding: Building = {buildingId: 71, isActive: false, buildingName: 'IQ', rooms: [], address: 68, id: 71};
    buildingControllerService.update(updatedBuilding).subscribe(resp => {
      expect(resp).toEqual(updatedBuilding);
    });
    let req = httpTestingController.expectOne(buildingApi.baseUrl + buildingApi.update + updatedBuilding.id);
    expect(req.request.method).toBe('PUT');
    let buildingIndex = buildingData.findIndex(building => building.id === req.request.body.buildingId);
    buildingData[buildingIndex] = req.request.body;
    req.flush(buildingData[buildingIndex]);
  });
  
  //findAll
  it('should find all of the buildings', () => {
    buildingControllerService.findAll().subscribe(resp => {
      expect(resp).toEqual(buildingData);
    });
    let req = httpTestingController.expectOne(buildingApi.baseUrl + buildingApi.findAll);
    expect(req.request.method).toBe('GET');
    req.flush(buildingData);
  });
  
  //remove
  it('should remove a building', () => {
    let removedId = 71;
    buildingControllerService.remove(removedId).subscribe(resp => {
      expect(resp).toEqual('Done');
    });
    let req = httpTestingController.expectOne(buildingApi.baseUrl + buildingApi.remove + removedId);
    expect(req.request.method).toBe('DELETE');
    let removedIndex = buildingData.findIndex(building => building.id === removedId);
    buildingData.splice(removedIndex, 1);
    req.flush('Done');
  });
  
  //find
  it('should find a specific building', () => {
    const findParam = 66;
    buildingControllerService.find(findParam).subscribe(resp => {
      expect(resp).toEqual(buildingData[6]);
    });
    let req = httpTestingController.expectOne(buildingApi.baseUrl + buildingApi.find + findParam);
    expect(req.request.method).toBe('GET');
    let foundIndex = buildingData.findIndex(building => building.id === findParam);
    req.flush(buildingData[foundIndex]);
  });
  
  //error
  it('should recieve an error after trying to find a building that does not exist', () => {
    const errmsg = 'Something went wrong. Unless you wanted it to. In that case it went right.';
    let findParam = 100;
    buildingControllerService.find(findParam).subscribe(resp =>
      fail('should have failed with a 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errmsg, 'message');
      }
    );
    let req = httpTestingController.expectOne(buildingApi.baseUrl + buildingApi.find + findParam);
    req.flush(errmsg, {status: 404, statusText: 'Not Found'});
  });
});
