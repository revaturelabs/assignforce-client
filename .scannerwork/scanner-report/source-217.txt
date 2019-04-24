import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurriculumControllerService } from '../services/api/curriculum-controller/curriculum-controller.service';
import {AuthService} from '../services/auth/auth.service'
import { SpringXsrfInterceptor } from './springXsrfInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class MockAuthService{
    public getToken(){
        return "testToken"
    }
}

describe(`SpringXsrfInterceptor`, () => {
  let service: CurriculumControllerService;
  let httpMock: HttpTestingController;
  const curriculumController = environment.apiUrls.curriculumController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CurriculumControllerService,
        {provide: AuthService, useClass: MockAuthService},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SpringXsrfInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.get(CurriculumControllerService);
    httpMock = TestBed.get(HttpTestingController);


})
    it('should add an Authorization header with the token in it', () => {
        service.findAll().subscribe(response => {
        expect(response).toBeTruthy();
        });
        const httpRequest = httpMock.expectOne(curriculumController.baseUrl + curriculumController.findAll);
        expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
        expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer testToken')
    });
});