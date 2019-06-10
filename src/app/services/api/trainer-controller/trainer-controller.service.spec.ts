import { TestBed,getTestBed, inject } from '@angular/core/testing';
import { Trainer } from '../../../model/Trainer';
import { TrainerControllerService } from './trainer-controller.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment.local-server';
import { mockTrainers, trainerService } from '../../../../jestGlobalMocks';
import { Observable } from 'rxjs/Observable';

describe('TrainerControllerService', () => {
  let service: TrainerControllerService;
  let httpMock: HttpTestingController;
  let trainers: Trainer[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrainerControllerService],
      
    });
    service = TestBed.get(TrainerControllerService);
    httpMock = TestBed.get(HttpTestingController);
   
  });

  it('should be created', inject([TrainerControllerService], (service: TrainerControllerService) => {
    expect(service).toBeTruthy();
  }));

  it(' should call find', inject([TrainerControllerService],(service: TrainerControllerService)=>  {
    expect(service.find).toBeTruthy
  }));

  it(' should call findAll', inject([TrainerControllerService],(service: TrainerControllerService)=>  {
    expect(service.findAll).toBeTruthy();
  }));

  it(' should call update', inject([TrainerControllerService],(service: TrainerControllerService)=>  {
    expect(service.update).toBeTruthy
  }));

  it(' should call remove', inject([TrainerControllerService],(service: TrainerControllerService)=>  {
    expect(service.remove).toBeTruthy
  }));
  


describe('CRUD and REST testing',() => {
  let service: TrainerControllerService;
  let httpMock: HttpTestingController;
  let trainers: Trainer[];

  beforeEach(()=> {
    
        let trainer1 = new Trainer( 1,'Test1', 'Test1', [], null, false, null,null, 'test1@email.com',null,null);
        let trainer2 = new Trainer( 2,'Test2', 'Test2', [], null, false, null,null, 'test2@email.com',null,null);
        trainers = [trainer1, trainer2];

        service = TestBed.get(TrainerControllerService);
        httpMock = TestBed.get(HttpTestingController);
  })

  afterEach(() => {
  })


  it('should find one ', inject([TrainerControllerService],
    (service: TrainerControllerService) => {
      const findParam = 1;
      service.find(findParam).subscribe(resp =>{
        expect(resp).toEqual(trainers[0]);
      });
      const httpMock = TestBed.get(HttpTestingController);
      const trainerController = environment.apiUrls.trainerController.findAll;
      let req;
  
      service.findAll()
      .subscribe(res => {req =res;
  
        httpMock.expectOne(trainerController);
        expect(req.request.method).toEqual('GET');
      });
  }));

  it('should find all', inject([TrainerControllerService],
    (service: TrainerControllerService) => {
      service.findAll().subscribe(resp =>{
        expect(resp.length).toEqual(2);
      });
      const httpMock = TestBed.get(HttpTestingController);
    const trainerController = environment.apiUrls.trainerController.findAll;
    let req;

    service.findAll()
    .subscribe(res => {req =res;

      httpMock.expectOne(trainerController);
      expect(req.request.method).toEqual('GET');
    });
  }));

  it('should update a trainer', inject([TrainerControllerService],
    (service:TrainerControllerService) => {
      const updateTrainer = new Trainer( 1,'NewTest', 'Test1', [], null, false, null,null, 'test1@email.com',null,null);
      service.update(updateTrainer).subscribe(resp =>{
        expect(resp.firstName).toBe('NewTesT');
      });

    const httpMock = TestBed.get(HttpTestingController);
    const trainerController = environment.apiUrls.trainerController;
    let req;

    service.update(updateTrainer)
    .subscribe(res => {req =res;

      httpMock.expectOne(trainerController);
      expect(req).toEqual('PUT');
    });
  }));

  it('should remove trainer', inject([TrainerControllerService],
    (service: TrainerControllerService) => {
      let trainer1;
      service.remove(trainer1).subscribe(resp =>{
        expect(resp).toEqual(null);
      });
      const httpMock = TestBed.get(HttpTestingController);
    const trainerController = environment.apiUrls.trainerController.findAll;
    let req;

    service.remove(trainer1)
    .subscribe(res => {req =res;

      httpMock.expectOne(trainerController);
      expect(req.request.method).toEqual('DELETE');
    });
  }));


});


  
 

  // it('should call GET for the find method', inject([TrainerControllerService],(service: TrainerControllerService)=> {
  //   const httpMock = TestBed.get(HttpTestingController);
  //   const trainerController = environment.apiUrls.trainerController.find;
  //   let req;

  //   service.find(1)
  //   .subscribe(res => {req =res;

  //     httpMock.expectOne(trainerController);
  //     expect(req.request.method).toEqual('GET');
  //   });
  // }))
  

  

  // it('should findAll Trainers to be not null', inject([TrainerControllerService],
  //   (service: TrainerControllerService) => {
      
  //   expect(service.findAll()).not.toBe(null);

  // }));

 

  // it('should call GET for the findall method', inject([TrainerControllerService],(service: TrainerControllerService)=> {
  //   const httpMock = TestBed.get(HttpTestingController);
  //   const trainerController = environment.apiUrls.trainerController.findAll;
  //   let req;

  //   service.findAll()
  //   .subscribe(res => {req =res;

  //     httpMock.expectOne(trainerController);
  //     expect(req.request.method).toEqual('GET');
  //   });
  // }))


  
  // it('should call PUT for the update method', inject([TrainerControllerService],(service: TrainerControllerService)=> {
  //   const httpMock = TestBed.get(HttpTestingController);
  //   const trainerController = environment.apiUrls.trainerController;
  //   let req;
  //   let trainer1 = new Trainer( 1,'Test1', 'Test1', [], null, false, null,null, 'test@email.com',null,null);

  //   service.update(trainer1)
  //   .subscribe(res => {req =res;

  //     httpMock.expectOne(trainerController);
  //     expect(req).toEqual('PUT');
  //   });
  // }))
  
  // it('should call DELETE for the remove method', inject([TrainerControllerService],(service: TrainerControllerService)=> {
  //   const httpMock = TestBed.get(HttpTestingController);
  //   const trainerController = environment.apiUrls.trainerController.remove;
  //   let req;
  //    let trainer1 = new Trainer( 1,'Test1', 'Test1',null, null, false, null,null, 'test@email.com',null,null);


  //   service.remove(1)
  //   .subscribe(res => {req =res;

  //     httpMock.expectOne(trainerController);
  //     expect(req.request.method).toEqual('DELETE');
  //   });
  // }))
  // it(' should call find by email', inject([TrainerControllerService],(service: TrainerControllerService)=>  {
  //   expect(service.findByEmail).toBeTruthy
  // }))

  
  // it('should call Get for the find by email method', inject([TrainerControllerService],(service: TrainerControllerService)=> {
  //   const httpMock = TestBed.get(HttpTestingController);
  //   let email = 'test@gmail.com'
  //   const trainerController = environment.apiUrls + `/email/${email}`;
  //   let req;

  //   service.findByEmail("g")
  //   .subscribe(res => {req =res;

  //     httpMock.expectOne(trainerController);
  //     expect(req.request.method).toEqual('GET');
  //   });
  // }))
// 

//   it('expects service to fetch all trainers',
//   inject([HttpTestingController, TrainerControllerService],
//     (httpMock: HttpTestingController, service: TrainerControllerService) => {
//       // We call the service
//       service.findAll().subscribe(data => {
//         expect(data.entries).toBe(data.length);
//       });
//       // We set the expectations for the HttpClient mock
//       const req = httpMock.expectOne('http://../api/trainer/');
//       expect(req.request.method).toEqual('GET');
//       // Then we set the fake data to be returned by the mock
//       req.flush({data:...});
//     })
// );
  // Attempts to test the URL's keep getting a this.handler.handle error solutions online said adding error handling
  //to ts that call it however it didn't fix the error

  // it('should get the data', ()=>{
  //   service.find(203).subscribe((data:any)=>{
  //     expect(data.id).toBe(203);
  //   });
  //
  //   const req = httpMock.expectOne(`https://18.191.174.118:8765/trainer-service/203`, 'call to api');
  //   expect(req.request.method).toBe('GET');
  //
  //   req.flush({
  //     id:203
  //   });
  //
  //   httpMock.verify();
  //
  // });
});
