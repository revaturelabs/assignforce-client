import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { AppMaterialModule } from '../../material.module';
import { Curriculum } from '../../model/Curriculum';
import { Skill } from '../../model/Skill';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { CoreComponent } from '../core/core.component';
import { CurriculumSkillsComponent } from '../curriculum-skills/curriculum-skills.component';
import { CurriculaComponent } from './curricula.component';
import { SkillsComponent } from '../skills/skills.component';
import { AuthService } from '../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UrlService } from '../../services/url/url.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';

describe('CurriculaComponent', () => {
  let component: CurriculaComponent;
  let fixture: ComponentFixture<CurriculaComponent>;
  
  const testSkillData: Skill[] = [
    new Skill(1,"skill1", true),
    new Skill(2, "skill2", true),
    new Skill(3, "skill3", false)
  ];

  const testData: Curriculum[] = [
      new Curriculum(1, 'Test Curriculum', true, true, [testSkillData[0], testSkillData[1]]),
      new Curriculum(2, 'Test Curriculum 2', true, false, [testSkillData[2], testSkillData[1]])
  ];

  class MockSkillControllerService {
    find(id: number) {
      return Observable.of(testSkillData.find( (skill) => skill.id === id));
    }
    findAll() {
      return Observable.of(testSkillData);
    }
  }

  class MockCurriculumControllerService {
    findAll(): Observable<Curriculum[]> {
      return Observable.of(testData);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule],
      declarations: [CurriculaComponent, CoreComponent, CurriculumSkillsComponent],
      providers: [ CoreComponent, SkillsComponent, AuthService, UrlService, CachedObjectsService,
        { provide: CurriculumControllerService, useClass: MockCurriculumControllerService },
        { provide: SkillControllerService, useClass: MockSkillControllerService },
        { provide: Router, useClass: RouterTestingModule}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
