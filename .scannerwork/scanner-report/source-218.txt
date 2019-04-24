import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { AddressControllerService } from './address-controller.service';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Address } from '../../../model/Address';
import { environment } from '../../../../environments/environment';

describe('AddressControllerService', () => {
  let httpTestingController: HttpTestingController;
  let addressControllerService: AddressControllerService;
  let addressData: Address[];
  const addressApi = environment.apiUrls.addressController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddressControllerService, HttpClient]
    });

    httpTestingController = getTestBed().get(HttpTestingController);
    addressControllerService = getTestBed().get(AddressControllerService);
    addressData = [
      {
        "id": 66,
        "name": "USF",
        "city": "Tampa",
        "state": "Florida",
        "buildings": [],
        "isActive": true
      },
      {
        "id": 67,
        "name": "GMU",
        "city": "Fairfax",
        "state": "VA",
        "buildings": [],
        "isActive": true
      },
      {
        "id": 68,
        "name": "Tampa",
        "city": "Tampa",
        "state": "Florida",
        "buildings": [],
        "isActive": true
      }
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([AddressControllerService], (service: AddressControllerService) => {
    expect(service).toBeTruthy();
  }));

  it('should create a new address', () => {
    let newAddress: Address = {id: 70, name: 'NOLA', city: 'New Orleans', state: 'Louisiana', buildings: [], isActive: true};

    addressControllerService.create(newAddress).subscribe(resp => {
      expect(resp).toEqual(newAddress);
    });
    
    let req0 = httpTestingController.expectOne(addressApi.baseUrl + addressApi.create);
    expect(req0.request.method).toBe('POST');
    addressData.push(req0.request.body);
    let dataSize = addressData.length;
    req0.flush(addressData[dataSize-1]);
  });

  it('should update an address', () => {
    let updatedAddress: Address = {id: 66, name: 'NOLA', city: 'New Orleans', state: 'Louisiana', buildings: [], isActive: false};

    addressControllerService.update(updatedAddress).subscribe(resp => {
      expect(resp).toEqual(updatedAddress);
    });

    let req1 = httpTestingController.expectOne(addressApi.baseUrl + addressApi.update + updatedAddress.id);
    expect(req1.request.method).toBe('PUT');
    let newUpdate = req1.request.body;
    let addressIndex = addressData.findIndex(address => address.id === newUpdate.id);
    addressData[addressIndex] = newUpdate;
    req1.flush(addressData[addressIndex]);
  });

  it('should find all addresses', () => {
    addressControllerService.findAll().subscribe(resp => {
      expect(resp).toEqual(addressData);
    });
    let req2 = httpTestingController.expectOne(addressApi.baseUrl + addressApi.findAll);
    expect(req2.request.method).toBe('GET');
    req2.flush(addressData);
  });

  it('should remove an address', () => {
    let removedAddress: Address = {id: 70, name: 'NOLA', city: 'New Orleans', state: 'Louisiana', buildings: [], isActive: false};
    addressControllerService.remove(removedAddress.id).subscribe(resp => {
      expect(resp).toEqual('Done');
    });
    let req = httpTestingController.expectOne(addressApi.baseUrl + addressApi.remove + removedAddress.id);
    expect(req.request.method).toEqual('DELETE');
    let removedAddressIndex = addressData.findIndex(address => address.id === removedAddress.id);
    addressData.splice(removedAddressIndex, 1);
    req.flush('Done');
  });

  it('should find a specific address', () => {
    const findParam = 67;
    addressControllerService.find(findParam).subscribe(resp => {
      expect(resp).toEqual(addressData[1]);
    });

    let req = httpTestingController.expectOne(addressApi.baseUrl + addressApi.find + findParam);
    expect(req.request.method).toEqual('GET');
    let foundAddressIndex = addressData.findIndex(address => address.id === findParam);
    req.flush(addressData[foundAddressIndex]);
  })

  it('should error out while searching for a non-existent address', () => {
    const errmsg = 'Something went wrong. Unless you wanted it to. In that case it went right.';
    let findParam = 70
    addressControllerService.find(findParam).subscribe(resp => 
      fail('should have failed with a 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errmsg, 'message');
      }
    );

    let req = httpTestingController.expectOne(addressApi.baseUrl + addressApi.find + findParam);
    req.flush(errmsg, { status: 404, statusText: 'Not Found' });
  });
});
