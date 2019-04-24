import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCurriculumComponent } from './edit-curriculum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../material.module';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Curriculum } from '../../model/Curriculum';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/observable/of';

describe('EditCurriculumComponent', () => {
  let curriculumControllerService: MockCurriculumControllerService;
  let dialogRef: MockMatDialogRef;
  let component: EditCurriculumComponent;
  let fixture: ComponentFixture<EditCurriculumComponent>;

  const testData: Curriculum[] = [
    new Curriculum(1, 'Test Curriculum', true, true, [new Skill(1, "skill1", true)]),
    new Curriculum(2, 'Test Curriculum 2', true, false, [new Skill(2, "skill2", true)])
  ];
  const curriculaControllerService = CurriculumControllerService; 

  class MockCurriculumControllerService {
    findAll(): Observable<Curriculum[]> {
      return Observable.of(testData);
    }
    update(curriculum): Observable<boolean> {
      return Observable.of(true);
    }
  };

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

  class MockMatDialogRef {
    open() {}
    close() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppMaterialModule, BrowserAnimationsModule, FormsModule],
      declarations: [EditCurriculumComponent],
      providers: [{ provide:MatDialogRef},
                  { provide: CurriculumControllerService, useClass: MockCurriculumControllerService},
                  { provide: SkillControllerService, useClass: MockSkillControllerService},
                  { provide: HttpClientModule, useClass: HttpClientTestingModule},
                  { provide: MatDialogRef, useClass: MockMatDialogRef}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCurriculumComponent);
    component = fixture.componentInstance;
    component.data = { "curriculumData" : testData[1]};
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    curriculumControllerService = TestBed.get(CurriculumControllerService);
    dialogRef = TestBed.get(MatDialogRef);
  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should close the modal', () => {
      component.curriculum = testData[1];
      component.data = testData[1];
  
      spyOn(curriculumControllerService, 'update')
        .and.callFake(() => {
          return Observable.of('please work')
        });
  
      spyOn(component, "closeDialog")
        .and.callThrough();
  
      component.curriculum = testData[1];
      component.editCurriculum();
  
      expect(component.closeDialog).toHaveBeenCalled();
    });

    it('should compare two identical skills and return true', () => {
      expect(component.compareFunction(testSkillData[0], testSkillData[0])).toBeTruthy();
    });

    it('should compared two different skills and return false', () => {
      expect(component.compareFunction(testSkillData[0], testSkillData[1])).toBeFalsy();
    });

    it('should reset the curriculum object so that we do not have undefined issues when loading a page', () => {
      const curriculum: Curriculum = {
        id: 567,
        name: 'test',
        skills: [testSkillData[0], testSkillData[1], testSkillData[2]],
        isActive: false,
        isCore: false
      };
      component.curriculum = curriculum;
      component.newCurriculum();
      expect(component.curriculum).toEqual({id: 0, name: '', skills: [], isActive: true, isCore: true});
    });

    it('should send the updated curriculum to the backend to be processed', () => {
      component.curriculum = testData[1];
      component.data = testData[1];
  
      spyOn(curriculumControllerService, 'update')
        .and.callThrough();
  
      spyOn(component, "closeDialog")
        .and.callFake(() => {
        });
  
      component.curriculum = testData[1];
      component.editCurriculum();
  
      expect(curriculumControllerService.update).toHaveBeenCalled();
    });
});
