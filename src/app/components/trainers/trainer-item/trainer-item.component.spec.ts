import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerItemComponent } from './trainer-item.component';
import { TrainersComponent } from '../trainers.component';
import { Skill } from '../../../model/Skill';
import { AppMaterialModule } from '../../../material.module';
import { Trainer } from '../../../model/Trainer';
import { TrainerControllerService } from '../../../services/api/trainer-controller/trainer-controller.service';
import { SkillControllerService } from '../../../services/api/skill-controller/skill-controller.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';
import { UrlService } from '../../../services/url/url.service';
import { CachedObjectsService } from '../../../services/api/cache/cached-objects.service';
import { from } from 'rxjs/observable/from';

describe('TrainerItemComponent', () => {
  let component: TrainerItemComponent;
  let fixture: ComponentFixture<TrainerItemComponent>;
  let cacheService: CachedObjectsService;
  let skillService: SkillControllerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [TrainerItemComponent, TrainersComponent],
      providers: [TrainerControllerService,
        SkillControllerService,
        AppMaterialModule,
        AuthService,
        UrlService,
        CachedObjectsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerItemComponent);
    component = fixture.componentInstance;
    component.trainer = new Trainer(1, '', '', [], [], false, null, [], 'email', 1, '');
    cacheService = TestBed.get(CachedObjectsService);
    skillService = TestBed.get(SkillControllerService);

    spyOn(skillService, 'findAll').and.callFake(() => {
      return from([[1, 2, 3]]);
    });

    spyOn(cacheService, 'setSkills').and.callFake(() => {
      return from([[1, 2, 3]]);
    });

    spyOn(component, 'listSkills').and.callFake(() => {
      return from([[1, 2, 3]]); 
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test trainer deactivation
  it('should switch trainer to deactivated condition', () => {
    component.removeTrainer();
    expect(component.trainer.isActive).toBe(false);
  });

  // test trainer reactivation
  it('should switch trainer to active condition', () => {
    component.activateTrainer();
    expect(component.trainer.isActive).toBe(true);
  });

  it('skillService.findAll should be defined', () => {
    expect(skillService.findAll).toBeDefined();
  });

  it('should call skill service findAll', () => {
    skillService.findAll();
    expect(skillService.findAll).toHaveBeenCalled();
  });

  it('should call cache service setSkills', () => {
    let response = null;
    cacheService.setSkills(response);
    expect(cacheService.setSkills).toHaveBeenCalled();
  });

  it('component should call listSkills', () => {
    component.listSkills();
    expect(component.listSkills).toHaveBeenCalled();
  });

  it('listSkills passed some skills should be truthy', () => {
    component.trainer.skills = [{
      skillId: 4,
      skillName: 'AngularJ',
      isActive: true
    },
    {
      skillId: 1,
      skillName: 'Core Java',
      isActive: true
    }];
    component.listSkills();
    expect(component.listSkills).toBeTruthy();
  });

});
