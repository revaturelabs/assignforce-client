import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { RoomControllerService } from './room-controller.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Room } from '../../../model/Room';
import { environment } from '../../../../environments/environment';

describe('RoomControllerService', () => {
    let httpTestingController: HttpTestingController;
    let roomControllerService: RoomControllerService;
    let roomData: Room[];
    const roomApi = environment.apiUrls.roomController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RoomControllerService, HttpClient]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        roomControllerService = TestBed.get(RoomControllerService);
        roomData = [
          {
              "id": 1,
              "roomName": "201",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 2,
              "roomName": "202",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 3,
              "roomName": "204",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 4,
              "roomName": "205",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 5,
              "roomName": "X1",
              "active": false,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 6,
              "roomName": "207",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 100,
              "roomName": "X2",
              "active": false,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 101,
              "roomName": "X3",
              "active": false,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 122,
              "roomName": "209",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 102,
              "roomName": "203",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 103,
              "roomName": "206",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 142,
              "roomName": "214",
              "active": true,
              "building": 1,
              unavailabilities: [],
              "capacity": 35
            },
            {
              "id": 143,
              "active": true,
              "roomName": "2301 C",
              "building": 66,
              "unavailabilities": [
                {
                  "id": 0,
                  "startDate": new Date("2018-12-04T05:00:00.000Z"),
                  "endDate": new Date("2018-12-18T05:00:00.000Z"),
                  "description": "Vacation 3",
                  "room": 143
                },
                {
                  "id": 0,
                  "startDate": new Date("2018-12-11T05:00:00.000Z"),
                  "endDate": new Date("2018-12-19T05:00:00.000Z"),
                  "description": "Brians vacation",
                  "room": 143
                },
                {
                  "id": 0,
                  "startDate": new Date("2018-12-17T05:00:00.000Z"),
                  "endDate": new Date("2018-12-28T05:00:00.000Z"),
                  "description": "hhhxxx",
                  "room": 143
                }
              ],
              "capacity": 35
            },
            {
              "id": 145,
              "active": true,
              "roomName": "Chik Fil A",
              "building": 67,
              "unavailabilities": [],
              "capacity": 35
            },
            {
              "id": 146,
              "active": true,
              "roomName": "Subway",
              "building": 67,
              "unavailabilities": [],
              "capacity": 35
            },
            {
              "id": 147,
              "active": true,
              "roomName": "1st Floor",
              "building": 68,
              "unavailabilities": [
                {
                  "id": 0,
                  "startDate": new Date("2018-12-02T02:12:13.417Z"),
                  "endDate": new Date("2018-12-02T02:12:13.417Z"),
                  "description": "James broke the building",
                  "room": 147
                },
                {
                  "id": 0,
                  "startDate": new Date("2018-12-02T22:00:42.931Z"),
                  "endDate": new Date("2018-12-02T22:00:42.931Z"),
                  "description": "Vacationing",
                  "room": 147
                }
              ],
              "capacity": 35
            },
            {
              "id": 148,
              "active": true,
              "roomName": "China Town",
              "building": 68,
              "unavailabilities": [
                {
                  "id": 0,
                  "startDate": new Date("2018-12-11T05:00:00.000Z"),
                  "endDate": new Date("2018-12-17T05:00:00.000Z"),
                  "description": "Valid test 1",
                  "room": 148
                },
                {
                  "id": 0,
                  "startDate": new Date("2018-12-10T05:00:00.000Z"),
                  "endDate": new Date("2018-12-18T05:00:00.000Z"),
                  "description": "Valid test 2",
                  "room": 148
                }
              ],
              "capacity": 35
            },
            {
              "id": 149,
              "active": true,
              "roomName": "3rd Floor",
              "building": 68,
              "unavailabilities": [
                {
                  "id": 0,
                  "startDate": new Date("2018-12-03T17:31:28.303Z"),
                  "endDate": new Date("2018-12-18T05:00:00.000Z"),
                  "description": "test",
                  "room": 149
                }
              ],
              "capacity": 35
            },
            {
              "id": 150,
              "active": true,
              "roomName": "200 A",
              "building": 69,
              "unavailabilities": [
                {
                  "id": 0,
                  "startDate": new Date("2018-12-17T05:00:00.000Z"),
                  "endDate": new Date("2018-12-26T05:00:00.000Z"),
                  "description": "Winter Break",
                  "room": 150
                },
                {
                  "id": 0,
                  "startDate": new Date("2018-12-10T05:00:00.000Z"),
                  "endDate": new Date("2018-12-18T05:00:00.000Z"),
                  "description": "New Semester",
                  "room": 150
                }
              ],
              "capacity": 35
            },
            {
              "id": 151,
              "active": true,
              "roomName": "Bat Cave",
              "building": 70,
              "unavailabilities": [
                {
                  "id": 0,
                  "startDate": new Date("2018-12-06T05:00:00.000Z"),
                  "endDate": new Date("2018-12-18T05:00:00.000Z"),
                  "description": "Renovations",
                  "room": 151
                },
                {
                  "id": 0,
                  "startDate": new Date("2018-12-03T17:28:27.729Z"),
                  "endDate": new Date("2018-12-18T05:00:00.000Z"),
                  "description": "New test",
                  "room": 151
                }
              ],
              "capacity": 35
            }
      ];
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(roomControllerService).toBeTruthy();
    });

    //create
    it('should create a new Room', () => {
        let newRoom: Room = {id: 200, roomName: 'Unit Room', building: 67, active: true, unavailabilities: [], capacity: 35};
        roomControllerService.create(newRoom).subscribe(resp => {
            expect(resp).toEqual(newRoom);
        });
        let req = httpTestingController.expectOne(roomApi.baseUrl + roomApi.create);
        expect(req.request.method).toBe('POST');
        roomData.push(req.request.body);
        let dataSize = roomData.length;
        req.flush(roomData[dataSize-1]);
    });

    //update
    it('should update an existing room', () => {
        let updatedRoom: Room = {id: 150, roomName: 'Unit Room', building: 67, active: false, unavailabilities: [], capacity: 35};
        roomControllerService.update(updatedRoom).subscribe(resp => {
            expect(resp).toEqual(updatedRoom);
        });
        let req = httpTestingController.expectOne(roomApi.baseUrl + roomApi.update + updatedRoom.id);
        expect(req.request.method).toBe('PUT');
        let roomIndex = roomData.findIndex(room => room.id === updatedRoom.id);
        roomData[roomIndex] = req.request.body;
        req.flush(roomData[roomIndex]);
    })
    //find
    it('should find a specific room', () => {
        const findParam = 150;
        roomControllerService.find(findParam).subscribe(resp => {
            expect(resp).toEqual({
                "id": 150,
                "active": true,
                "roomName": "200 A",
                "building": 69,
                "unavailabilities": [
                  {
                    "id": 0,
                    "startDate": new Date("2018-12-17T05:00:00.000Z"),
                    "endDate": new Date("2018-12-26T05:00:00.000Z"),
                    "description": "Winter Break",
                    "room": 150
                  },
                  {
                    "id": 0,
                    "startDate": new Date("2018-12-10T05:00:00.000Z"),
                    "endDate": new Date("2018-12-18T05:00:00.000Z"),
                    "description": "New Semester",
                    "room": 150
                  }
                ]
              });
        });
        let req = httpTestingController.expectOne(roomApi.baseUrl + roomApi.find + findParam);
        expect(req.request.method).toBe('GET');
        let foundIndex = roomData.findIndex(room => room.id === findParam);
        req.flush(roomData[foundIndex]);
    });
    //findAll
    it('should find all rooms', () => {
        roomControllerService.findAll().subscribe(resp => {
            expect(resp).toEqual(roomData);
        });
        let req = httpTestingController.expectOne(roomApi.baseUrl + roomApi.findAll);
        expect(req.request.method).toBe('GET');
        req.flush(roomData);
    });
    //remove
    it('should remove a room', () => {
        let removeId = 150;
        roomControllerService.remove(removeId).subscribe(resp => {
            expect(resp).toEqual(
              [
                {
                    "id": 1,
                    "roomName": "201",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 2,
                    "roomName": "202",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 3,
                    "roomName": "204",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 4,
                    "roomName": "205",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 5,
                    "roomName": "X1",
                    "active": false,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 6,
                    "roomName": "207",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 100,
                    "roomName": "X2",
                    "active": false,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 101,
                    "roomName": "X3",
                    "active": false,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 122,
                    "roomName": "209",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 102,
                    "roomName": "203",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 103,
                    "roomName": "206",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 142,
                    "roomName": "214",
                    "active": true,
                    "building": 1,
                    unavailabilities: []
                  },
                  {
                    "id": 143,
                    "active": true,
                    "roomName": "2301 C",
                    "building": 66,
                    "unavailabilities": [
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-04T05:00:00.000Z"),
                        "endDate": new Date("2018-12-18T05:00:00.000Z"),
                        "description": "Vacation 3",
                        "room": 143
                      },
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-11T05:00:00.000Z"),
                        "endDate": new Date("2018-12-19T05:00:00.000Z"),
                        "description": "Brians vacation",
                        "room": 143
                      },
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-17T05:00:00.000Z"),
                        "endDate": new Date("2018-12-28T05:00:00.000Z"),
                        "description": "hhhxxx",
                        "room": 143
                      }
                    ]
                  },
                  {
                    "id": 145,
                    "active": true,
                    "roomName": "Chik Fil A",
                    "building": 67,
                    "unavailabilities": []
                  },
                  {
                    "id": 146,
                    "active": true,
                    "roomName": "Subway",
                    "building": 67,
                    "unavailabilities": []
                  },
                  {
                    "id": 147,
                    "active": true,
                    "roomName": "1st Floor",
                    "building": 68,
                    "unavailabilities": [
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-02T02:12:13.417Z"),
                        "endDate": new Date("2018-12-02T02:12:13.417Z"),
                        "description": "James broke the building",
                        "room": 147
                      },
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-02T22:00:42.931Z"),
                        "endDate": new Date("2018-12-02T22:00:42.931Z"),
                        "description": "Vacationing",
                        "room": 147
                      }
                    ]
                  },
                  {
                    "id": 148,
                    "active": true,
                    "roomName": "China Town",
                    "building": 68,
                    "unavailabilities": [
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-11T05:00:00.000Z"),
                        "endDate": new Date("2018-12-17T05:00:00.000Z"),
                        "description": "Valid test 1",
                        "room": 148
                      },
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-10T05:00:00.000Z"),
                        "endDate": new Date("2018-12-18T05:00:00.000Z"),
                        "description": "Valid test 2",
                        "room": 148
                      }
                    ]
                  },
                  {
                    "id": 149,
                    "active": true,
                    "roomName": "3rd Floor",
                    "building": 68,
                    "unavailabilities": [
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-03T17:31:28.303Z"),
                        "endDate": new Date("2018-12-18T05:00:00.000Z"),
                        "description": "test",
                        "room": 149
                      }
                    ]
                  },
                  {
                    "id": 151,
                    "active": true,
                    "roomName": "Bat Cave",
                    "building": 70,
                    "unavailabilities": [
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-06T05:00:00.000Z"),
                        "endDate": new Date("2018-12-18T05:00:00.000Z"),
                        "description": "Renovations",
                        "room": 151
                      },
                      {
                        "id": 0,
                        "startDate": new Date("2018-12-03T17:28:27.729Z"),
                        "endDate": new Date("2018-12-18T05:00:00.000Z"),
                        "description": "New test",
                        "room": 151
                      }
                    ]
                  }
            ]
            );
        });
        let req = httpTestingController.expectOne(roomApi.baseUrl + roomApi.remove + removeId);
        expect(req.request.method).toBe('DELETE');
        let removedIndex = roomData.findIndex(room => room.id === removeId);
        roomData.splice(removedIndex, 1);
        req.flush(roomData);
    });
    //error
    it('should receive an error after trying to find a room that does not exist', () => {
        const errmsg = 'Something went wrong. Unless you wanted it to. In that case it went right.';
        let findParam = 250;
        roomControllerService.find(findParam).subscribe(resp =>
            fail('should have failed with a 404 error'),
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(404);
                expect(error.error).toEqual(errmsg);
            }
        );
        let req = httpTestingController.expectOne(roomApi.baseUrl + roomApi.find + findParam);
        req.flush(errmsg, {status: 404, statusText: 'Not Found'});
    });

  
});
