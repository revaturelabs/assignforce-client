
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { async, inject, TestBed } from "@angular/core/testing";
import {Sprint} from "../../../model/Sprint";
import { SprintControllerService } from "./sprint-controller.service";
import { CookieService } from "ngx-cookie-service";
import 'jasmine';

describe("SprintService", () => {

  let httpTestingController: HttpTestingController;
  let sprintControllerService: SprintControllerService;
  let sprints: Sprint[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SprintControllerService, HttpClient, CookieService],
    });
  }));

  beforeEach(async(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    sprintControllerService = TestBed.get(SprintControllerService);
  }));

  
    let date = new Date(2019,12,18);
    sprints = [
    new Sprint(1, "TestSprint", "Testing",'2018-12-18', date ,date, "Testing", "Testing1"),
    ];

  it("should be created", inject([SprintControllerService], (service: SprintControllerService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    // Verifies all HTTP requests have been handled
    httpTestingController.verify();
  });

  
});
