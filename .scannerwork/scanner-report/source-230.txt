import { TestBed, inject } from '@angular/core/testing';
import { Unavailability } from '../../../model/Unavailability'
import { UnavailableControllerService } from './unavailable-controller.service';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('UnavailableControllerService', () => {
  let httpTestingController: HttpTestingController;
  let unavailableControllerService: UnavailableControllerService;
  let unavailableData: Unavailability[];
  const unavailableApi = environment.apiUrls.unavailableController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnavailableControllerService, HttpClient]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    unavailableControllerService = TestBed.get(UnavailableControllerService);
    unavailableData = [
      {
        "id": 12,
        "startDate": new Date(2018, 4),
        "endDate": new Date(2018, 9),
        "description": "this is a test unavailability",
        "room": 143
      },
      {
        "id": 42,
        "startDate": new Date(2019, 3),
        "endDate": new Date(2019, 6),
        "description": "This is another unavailability",
        "room": 200
      }
    ]
  });

  afterEach(() => {
    // Verifies all HTTP requests have been handled
    httpTestingController.verify();
  });

  it('should be created', inject([UnavailableControllerService], (service: UnavailableControllerService) => {
    expect(service).toBeTruthy();
  }));

  // Create
  it('should create an unavailability', () => {
    let newUnavailable: Unavailability = {id: 43, startDate: new Date(2018, 12), endDate: new Date(2019, 3), description: "Testing the creation method", room: 32};
    unavailableControllerService.create(newUnavailable).subscribe(resp => {
      expect(resp).toEqual(newUnavailable);
    });
    let req = httpTestingController.expectOne(unavailableApi.baseUrl + unavailableApi.create);
    expect(req.request.method).toBe('POST');
    unavailableData.push(req.request.body);
    let dataSize = unavailableData.length;
    req.flush(unavailableData[dataSize-1]);
  })

  // Update
  it('should update an existing unavailability', () => {
    let updatedUnavailability: Unavailability = {id: 42, startDate: new Date (2019, 12), endDate: new Date (2020, 3), description: "Testing the update method", room: 32};
    unavailableControllerService.update(updatedUnavailability).subscribe(resp => {
      expect(resp).toEqual(updatedUnavailability);
    });
    let req = httpTestingController.expectOne(unavailableApi.baseUrl + unavailableApi.update);
    expect(req.request.method).toBe('PUT');
    let unavailabilityIndex = unavailableData.findIndex(unavailable => unavailable.id === req.request.body.id);
    unavailableData[unavailabilityIndex] = req.request.body;
    req.flush(unavailableData[unavailabilityIndex]);
  });

  // Remove
  it('should delete an unavailability', () => {
    let deleteParam = 42;
    unavailableControllerService.remove(deleteParam).subscribe(resp => {
      expect(resp).toEqual(
        [
          {
            "id": 12,
            "startDate": new Date(2018, 4),
            "endDate": new Date(2018, 9),
            "description": "this is a test unavailability",
            "room": 143
          }
        ]
      )
    });
    let req = httpTestingController.expectOne(unavailableApi.baseUrl + unavailableApi.remove + deleteParam);
    expect(req.request.method).toBe('DELETE');
    let removedIndex = unavailableData.findIndex(unavailability => unavailability.id === deleteParam);
    unavailableData.splice(removedIndex, 1);
    req.flush(unavailableData);
  });
  // Find
  it('find a specific unavailability', () => {
    const findParam = 12;
    unavailableControllerService.find(findParam).subscribe(resp => {
      expect(resp).toEqual(unavailableData[0]);
    });
    let req = httpTestingController.expectOne(unavailableApi.baseUrl + unavailableApi.find + findParam);
    expect(req.request.method).toBe('GET');
    let foundIndex = unavailableData.findIndex(unavailability => unavailability.id === findParam);
    req.flush(unavailableData[foundIndex]);
  });

  // Find All
  it('should find all unavailabilities', () => {
    unavailableControllerService.findAll().subscribe(resp => {
      expect(resp).toEqual(unavailableData);
    });
    let req = httpTestingController.expectOne(unavailableApi.baseUrl + unavailableApi.findAll);
    expect(req.request.method).toBe('GET');
    req.flush(unavailableData);
  });

  // Error
  it('should receive an error after trying to find an unavailability that does not exist', () => {
    const errmsg = 'Something went wrong. Unless you wanted it to. In that case it went right.';
    let findParam = 250;
    unavailableControllerService.find(250).subscribe(resp =>
      fail('should have failed with a 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errmsg, 'message');
      }
    );
    let req = httpTestingController.expectOne(unavailableApi.baseUrl + unavailableApi.find + findParam);
    req.flush(errmsg, {status: 404, statusText: 'Not Found'});
  });
});
