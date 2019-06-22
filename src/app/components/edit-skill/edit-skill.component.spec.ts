import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { EditSkillComponent } from './edit-skill.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('EditSkillComponent', () => {
  let component: EditSkillComponent;
  let fixture: ComponentFixture<EditSkillComponent>;
  const mockDialogData: Skill = { id: 1, name: 'Test Skill', isActive: true };
  let skillControllerService: SkillControllerService;

  class MockDialogRef {
    close() {}
  }

  class MockSkillController {
    //update(skill: Skill) {}
    update(skill): Observable<boolean>{
      return Observable.of(true);
    }
    findAll(): Observable<Skill> {
      return Observable.of(mockDialogData);
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [EditSkillComponent],
        providers: [
          { provide: MatDialogRef, useClass: MockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
          { provide: SkillControllerService, useClass: MockSkillController }
        ],
        imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule]
      }).compileComponents();
      skillControllerService = TestBed.get(SkillControllerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name variable populated with current name of skill', () => {
    fixture.detectChanges();
    expect(component.data.name).toContain('Test Skill');
  });

  it('should create a new skill object when the new skill method is called', () => {
    component.newSkill();
    fixture.detectChanges();
    expect(component.data.name).toContain('');
  });

  it('should closeDialog', () => {
    component.closeDialog();
    fixture.detectChanges();
    expect(component.closeDialog).toBeTruthy();
  });

  it('should editSkill', ()=>{
    component.skill = mockDialogData[1];
    component.data = mockDialogData[1];

    spyOn(skillControllerService, 'update')
      .and.callThrough();

    component.skill = mockDialogData[1];
    component.editSkill();

    expect(skillControllerService.update).toHaveBeenCalled();
  });

});
