import 'rxjs/add/observable/of';

// import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { SkillsComponent } from './skills.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { CoreComponent } from '../core/core.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlService } from '../../services/url/url.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { removeSummaryDuplicates } from '@angular/compiler';
import { SSL_OP_NO_TLSv1_2 } from 'constants';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let skillService: SkillControllerService;

    let skills: Skill[] = [
      { skillId: 1, skillName: 'Java', isActive: true },
      { skillId: 2, skillName: 'SQL', isActive: true },
      { skillId: 3, skillName: 'Angular', isActive: true },
      { skillId: 4, skillName: 'C++', isActive: true }
    ];

    class MockSkillService {
  
    findAll(): Observable<Skill[]> {
      return Observable.of(skills);
    }
    /* may be just wrong */
    remove(skill: Skill): Observable<Skill> {
      skills = skills.filter((sk)=>sk!==skill);
      return Observable.of(skill);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, HttpClientTestingModule, FormsModule, ],//, HttpClient, HttpHandler],
      declarations: [SkillsComponent, CoreComponent],
      providers: [
        { provide: SkillControllerService, useClass: MockSkillService },
        { provide: Router, useClass: RouterTestingModule},
        TrainerControllerService, SkillsComponent, CoreComponent, AuthService, UrlService, CachedObjectsService
      ]
    }).compileComponents();
    skillService = TestBed.get(SkillControllerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TEST: getAllSkills should get all skills the teacher does and doesn't have, should be 4 because the component trainer has no skills currently
  it('should return a skill array', () => {
    skillService.findAll().toPromise().then(skills => {
      component.skillsList = skills;
      expect(component.skillsList.length).toBe(4, 'get all skills not fetching properly');
    });
  });

  it('should remove Java from the skillsList', () => {
    skillService.findAll().toPromise().then(skills=>{
      component.skillsList = skills;
      component.removeSkill({ id: 1, name: 'Java', active: true });
      expect(component.skillsList.length).toBe(3, 'skill not properly removed');
    });
  });

  //This is wrong, but I believe to update the trainers skill, it needs to be set to the property of trainer
  //and the skill property within the trainer.
  it('should update Trainers skill', ()=> {
    skillService.findAll().toPromise().then(skills=>{
      component.trainer.skills = skills;
      component.updateSkills();
      
      expect(this.trainer.skill).toBe('Python');
    });
  });

  it('should compare objects', ()=>{
    o1 : this.skill = {skillId: 1, skillName: 'Java', isActive: true };
    o2: this.skill = {skillId: 1, skillName: 'Java', isActive: true };
    spyOn(component,'compareObjects').and.callFake(()=>{
      expect(this.o1.skillId === this.o2.skillId).toBeFalsy();
    })
  });

  

});
