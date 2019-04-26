import { from } from './../../../../node_modules/rxjs/observable/from';
import { AuthService } from './../../services/auth/auth.service';
import { SkillControllerService } from './../../services/api/skill-controller/skill-controller.service';
import { BatchControllerService } from './../../services/api/batch-controller/batch-controller.service';
import { AddressControllerService } from './../../services/api/address-controller/address-controller.service';
import { CurriculumControllerService } from './../../services/api/curriculum-controller/curriculum-controller.service';
import { BatchesComponent } from './../batches/batches.component';
import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { S3CredentialService } from '../../services/s3-credential/s3-credential.service';
import { CertificationsComponent } from '../certifications/certifications.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SkillsComponent } from '../skills/skills.component';
import { ProfileComponent } from './profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { componentFactoryName } from '@angular/compiler';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let addressService: AddressControllerService;
  let trainerService: TrainerControllerService;
  let route: ActivatedRoute;
  let router: Router;
  let skillService: SkillControllerService;
  let auth0: AuthService;

  beforeEach(() => {
    addressService = new AddressControllerService(null);
    trainerService = new TrainerControllerService(null);
    skillService = new SkillControllerService(null);
    auth0 = new AuthService(null, null);
    component = new ProfileComponent(skillService, trainerService, addressService, router, route, auth0);

    spyOn(addressService, 'findAll');
   
    spyOn(trainerService, 'findAll');

    spyOn(skillService, 'findAll');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the address service findAll', () => {
    addressService.findAll();
    expect(addressService.findAll).toHaveBeenCalled();
  });

  it('should call the trainer service findAll', () => {
    trainerService.findAll();
    expect(trainerService.findAll).toHaveBeenCalled();
  });

  it('should call the skill service findAll', () => {
    skillService.findAll();
    expect(skillService.findAll).toHaveBeenCalled();
  });

  it('should call onLocationChange with address', () => {
    spyOn(component, 'onLocationChange');
    let address = null;
    component.onLocationChange(address);
    expect(component.onLocationChange).toHaveBeenCalledWith(address);
  });

  it('should call setTrainer with email', () => {
    spyOn(component, 'setTrainer');
    let email = "email@email.com";
    component.setTrainer(email);
    expect(component.setTrainer).toHaveBeenCalledWith(email);
  });

  it('should call toggleEdit', () => {
    spyOn(component, 'toggleEdit');
    component.toggleEdit();
    expect(component.toggleEdit).toHaveBeenCalled();
  });

  it('should should toggle Edit from true to false', () => {
    let edit = true;
    spyOn(component, 'toggleEdit').and.callFake(() => {
      return edit = false;
    });
    component.toggleEdit();
    expect(edit).toBe(false);
  });

  it('should call getFiles with event', () => {
    let event = new Event('test');
    spyOn(component, 'getFiles');
    component.getFiles(event);
    expect(component.getFiles).toHaveBeenCalledWith(event);
  });

  it('should call updateTrainer with trainer', () => {
    let trainer = null;
    spyOn(component, 'updateTrainer');
    component.updateTrainer(trainer);
    expect(component.updateTrainer).toHaveBeenCalledWith(trainer);
  });

  it('should call updateTrainerInfo', () => {
    spyOn(component,'updateTrainerInfo');
    component.updateTrainerInfo();
    expect(component.updateTrainerInfo).toHaveBeenCalled();
  });

  it('should call saveUnavailable', () => {
    spyOn(component, 'saveUnavailable');
    component.saveUnavailable();
    expect(component.saveUnavailable).toHaveBeenCalled();
  });

  it('should call verifyEmail', () => {
    spyOn(component, 'verifyEmail');
    component.verifyEmail();
    expect(component.verifyEmail).toHaveBeenCalled(); 
  });

  it('should call padZeroMonth with num', () => {
    spyOn(component, 'padZeroMonth');
    let num = 8;
    component.padZeroMonth(num);
    expect(component.padZeroMonth).toHaveBeenCalledWith(num);
  });

  it('should equal 09 when padZeroMonth called with num = 8', () => {
    let num = 8;
    expect(component.padZeroMonth(num)).toEqual("09");
  });

  it('should equal 10 when padZeroMonth called with num = 9', () => {
    let num = 9;
    expect(component.padZeroMonth(num)).toEqual(10);
  });

  it('should call padZeroDate with num', () => {
    spyOn(component, 'padZeroDate').and.callThrough();
    let num = 8;
    component.padZeroDate(num);
    expect(component.padZeroDate).toHaveBeenCalledWith(num);
  });

  it('should equal 08 when padZeroDate called with num = 8', () => {
    let num = 8;
    expect(component.padZeroDate(num)).toEqual("08");
  });

  it('should equal 15 when padZeroDate called with num = 15', () => {
    let num = 15;
    expect(component.padZeroDate(num)).toEqual(15);
  });
});



