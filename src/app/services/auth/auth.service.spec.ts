import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UrlService } from '../url/url.service';
import { AppRouting } from '../../app.routing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fn } from '@angular/compiler/src/output/output_ast';
import {} from 'jasmine';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
export class MockAuthService {
  lock = null;
  showLogin() {
    return;
  }
  handleAuthentication() {
    return;
  }
}
describe('AuthService', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: AuthService },
        UrlService,
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
    service = TestBed.get(AuthService);
   
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
      spyOn(localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear')
        .and.callFake(mockLocalStorage.clear);
  });
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  
  //login test needed for future iterations

  //logout test
  it('should remove all local storage items', ()=>{
    localStorage.setItem('access_token','acctoken');
    localStorage.setItem('id_token','idtoken');
    localStorage.setItem('expires_at','expat');
    localStorage.setItem('roles','rolestoken');
    
    service.logout();
    expect(localStorage.getItem('access_token')).toBe(null);
    expect(localStorage.getItem('id_token')).toBe(null);
    expect(localStorage.getItem('expires_at')).toBe(null);
    expect(localStorage.getItem('roles')).toBe(null);
  })

  //isAuthenticated tests
  it('should return true if expiration date is after now',()=>{
    localStorage.setItem('expires_at', JSON.stringify(new Date().getTime()+20000000));
    expect(service.isAuthenticated()).toBe(true);
  })
 
  it('should return false if expiration date is before now',()=>{
    localStorage.setItem('expires_at', JSON.stringify(new Date().getTime()));
    expect(service.isAuthenticated()).toBe(false);
  })
  //userHasRole tests
  it('should return false if isAuthenticated is false', ()=>{
    let expectedRoles = [];
    spyOn(service, 'isAuthenticated')
    .and.returnValue(false);
    spyOn(expectedRoles, 'every')
    .and.returnValue(true);
    expect(service.userHasRole(expectedRoles)).toBe(false);
  })
  it('should return false if expected roles contains a role localStorage roles does not', ()=>{
    let expectedRoles = ['role1','role2','role3', 'role4']
    spyOn(service, 'isAuthenticated')
    .and.returnValue(true);
    localStorage.setItem('roles', '{"role1", "role2", "role3"}');
    expect(service.userHasRole(expectedRoles)).toBe(false);
  })
  it('should return true if local storage roles contains all expectedRoles',()=>{
    let expectedRoles = ['role1', 'role2', 'role3']
    spyOn(service, 'isAuthenticated')
    .and.returnValue(true);
    localStorage.setItem('roles', '{"role1", "role2", "role3"}');
    expect(service.userHasRole(expectedRoles)).toBe(true);
  })
  
 //get Token test
 it('should get access token', ()=>{
   localStorage.setItem('access_token','test_token')
   expect(service.getToken()).toBe('test_token')
 })
 
});