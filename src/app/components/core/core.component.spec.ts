import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppMaterialModule } from '../../material.module';
import { Curriculum } from '../../model/Curriculum';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { CoreComponent } from './core.component';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { HttpClient } from 'selenium-webdriver/http';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlService } from '../../services/url/url.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { CurriculumSkillsComponent } from '../curriculum-skills/curriculum-skills.component';
import { MatDialog } from '@angular/material';


describe('CoreComponent', () => {
  let dialog: MdDialogMock;
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;
  let curriculumController: MockCurriculumControllerService;

  const testSkillData: Skill[] = [
    new Skill(1,"skill1", true),
    new Skill(2, "skill2", true),
    new Skill(3, "skill3", false)
  ];
  class MockSkillControllerService {
    find(id: number) {
      return Observable.of(testSkillData.find( (skill) => skill.skillId === id));
    }
    findAll() {
      return Observable.of(testSkillData);
    }
  }
  const testData: Curriculum[] = [
      new Curriculum(1, 'Test Curriculum', true, true, [testSkillData[0], testSkillData[1]]),
      new Curriculum(2, 'Test Curriculum 2', true, false, [testSkillData[2], testSkillData[1]])
  ];

  class MockCurriculumControllerService {
    findAll(): Observable<Curriculum[]> {
      return Observable.of(testData);
      
    }
    update(curriculum: Curriculum){
      if(curriculum == null){
        return Observable.of(new Error('testError'));
      }
      return curriculum;
    }
  }
  
  class MockAuthService {
    userHasRole(roles: string[]) : boolean {
      return true;
    }
  }

  class MdDialogMock{
    open(arg0, arg1){
      return {
        afterClosed: () => Observable.of({closed: "closed"})
      };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule],
      declarations: [CoreComponent],
      providers: [{ provide: CurriculumControllerService, useClass: MockCurriculumControllerService },
                  { provide: SkillControllerService, useClass: MockSkillControllerService},
                  {provide: Router, useClass: RouterTestingModule},
                  {provide: MatDialog, useClass: MdDialogMock},
                  {provide: AuthService, useClass: MockAuthService },
                   UrlService,
                  CachedObjectsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    dialog = TestBed.get(MatDialog)
    curriculumController = TestBed.get(CurriculumControllerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-list', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-list')).toBeTruthy();
  });

  it('should contain the core name', () => {
    const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('.core-name').textContent).toContain(component.coreData[0].name);
  });

  it('should contain the skills for the core', () => {
    const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('.core-skills').textContent).toContain(component.coreData[0].skills[0].name);
  });

  it('should contain an accordion for core curriculum', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-accordion')).toBeTruthy();
  });

  it('should contain a title named Core Curricula', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.isCore = true;
    fixture.detectChanges();
    expect(compiled.querySelector('mat-panel-title').textContent).toContain('Core Curricula');
  });

  it('should contain a title named Focus Curricula', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.isCore = false;
    fixture.detectChanges();
    expect(compiled.querySelector('mat-panel-title').textContent).toContain('Focus Curricula');
  });

  //loadCirriculum test
  it('should only contain curricula with matching isCore', ()=> {
  component.isCore = true;
  component.loadCurriculum();
  expect(component.coreData).toEqual([testData[0]]);
  });

  //curriculumSkills test
  it('should  return all skills in the curriculum parameter', () =>{
  component.skills = testSkillData;
  expect(component.curriculumSkills(testData[0])).toEqual([testSkillData[0],testSkillData[1]]);
  });

  //OpenEditCurriculum test
  it('should open a dialog when clicked', ()=>{
    spyOn(dialog, 'open').and.callThrough();
    component.openEditCurriculumSkillsDialog(testData[0]);
    expect(dialog.open).toHaveBeenCalled();
  })


  //OpenAddCurriculum test
  it('should open a dialog when clicked', ()=>{
    spyOn(dialog, 'open').and.callThrough();
    component.openAddCurriculumDialog(new Event('testEvent'),true );
    expect(dialog.open).toHaveBeenCalled();
  })

  //ConfirmRemoveCurriculum
  it('should change the curriculum to isActive=false', ()=>{
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(curriculumController, 'update').and.callThrough();
    
  })

  

});
