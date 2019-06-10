import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { CurriculumSkillsComponent } from './curriculum-skills.component';
import { AuthService } from '../../services/auth/auth.service';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { Router } from '../../../../node_modules/@angular/router';
import { UrlService } from '../../services/url/url.service';

describe('CurriculumSkillsComponent', () => {
  let component: CurriculumSkillsComponent;
  let fixture: ComponentFixture<CurriculumSkillsComponent>;
  
  const testData: Skill[] = [new Skill(1, 'Test Skill', true), new Skill(2, 'Test Skill 2', true)];
  let skillControllerService = SkillControllerService;

  class MockSkillControllerService {
    findAll(): Observable<Skill[]> {
      return Observable.of(testData);
    }
  }

  class MockAuthService {
    userHasRole(roles: string[]) : boolean {
      return true;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumSkillsComponent],
      imports: [AppMaterialModule, BrowserAnimationsModule],
      providers: [UrlService,
        { provide: SkillControllerService, useClass: MockSkillControllerService },
        { provide: Router, useClass: RouterTestingModule},
        { provide: AuthService, useClass: MockAuthService}
      ]
    }).compileComponents();
    skillControllerService = TestBed.get(SkillControllerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumSkillsComponent);
    component = fixture.componentInstance;
    let authService = TestBed.get(AuthService);
    authService.auth
    fixture.detectChanges();
  });

  // init
  it('should create', () => {
  expect(component).toBeTruthy();
  });

  //mat-list
  it('should contain a mat-list', () => {
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('mat-list')).toBeTruthy();
  });


  it('should contain the skill name', () => {
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('.skill-name').textContent).toContain(component.skillData[0].name);
  });


  it('should contain an accordion for the skills', () => {
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('mat-accordion')).toBeTruthy();
  });


  it('should contain a title named Skills', () => {
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('mat-panel-title').textContent).toContain('Skills');
  });

//should be able to remove
  it('should have a remove button', () => {
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('.remove-button')).toBeTruthy();
  });

//edit button should be there
  it('should have an edit button', () => {
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('.edit-button')).toBeTruthy();
  });

//openEditSkillDialog
it('should open the edit Dialog', () => {
  const compiled = fixture.debugElement.nativeElement;
  
});

});
