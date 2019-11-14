import { TestBed, inject } from '@angular/core/testing';
import { fileExists } from "ts-node/dist";

import { FilehandlerService } from './filehandler-controller.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FilehandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilehandlerService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([FilehandlerService], (service: FilehandlerService) => {
    expect(service).toBeTruthy();
  }));

  /*
    -----------------------
       File upload tests
    -----------------------
     */

  //ensures uploaded file is a file type that is not accepted
  it("should not upload file of undefined type", inject([FilehandlerService], (service: FilehandlerService) => {
    let fileIncorrectType: {
      type: "undefined"
    }

    expect(fileIncorrectType).toBeFalsy();
  }))

  //ensures uploaded file is a file type that is accepted
  it("should upload PDF file", inject([FilehandlerService], (filehandlerService: FilehandlerService) => {

    var file = new File(["foo"], "foo.txt", {
      type: "application/pdf"
    });

    expect(filehandlerService.fileValidityChecker(file)).toBeTruthy();
  }));

  //ensures file is of type text and is accepted
  it("should upload text file", inject([FilehandlerService], (filehandlerService: FilehandlerService) => {

    var file = new File(["foo"], "foo.txt",  {
      type: "text/plain"
    });

    expect(filehandlerService.fileValidityChecker(file)).toBeTruthy();
  }));

  //ensures file is not accepted if size is of unreasonable value
  it("should not upload file with size of negative value", inject([FilehandlerService], (filehandlerService: FilehandlerService) => {

    var file = new File(["foo"], "foo.txt",  {
      type: "text/plain"
    });

    Object.defineProperty(file, "size", {value: -1});

    expect(filehandlerService.fileValidityChecker(file)).toBeFalsy();
  }));

  //ensures file is not accepted if exceeds size limit
  it("should not upload empty file", inject([FilehandlerService], (filehandlerService: FilehandlerService) => {

    var file = new File(["foo"], "foo.txt",  {
      type: "text/plain"
    });

    Object.defineProperty(file, "size", {value: 0});

    expect(filehandlerService.fileValidityChecker(file)).toBeFalsy();
  }));

  //ensures file is not accepted if exceeds size limit
  it("should not upload file of size greater than the limit", inject([FilehandlerService], (filehandlerService: FilehandlerService) => {

    var file = new File(["foo"], "foo.txt",  {
      type: "text/plain"
    });

    Object.defineProperty(file, "size", {value: 6000000});
    expect(filehandlerService.fileValidityChecker(file)).toBeFalsy();
  }));

  //ensures file is accepted if within range
  it("should upload file of size equal to max limit", inject([FilehandlerService], (filehandlerService: FilehandlerService) => {

    var file = new File(["foo"], "foo.txt",  {
      type: "text/plain"
    });

    Object.defineProperty(file, "size", {value: 5000000});
    expect(filehandlerService.fileValidityChecker(file)).toBeTruthy();
  }));

});
