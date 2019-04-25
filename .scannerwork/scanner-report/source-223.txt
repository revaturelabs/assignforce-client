import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from '../../material.module';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { AddSkillComponent } from './add-skill.component';

describe('AddSkillComponent', () => {
  let component: AddSkillComponent;
  let fixture: ComponentFixture<AddSkillComponent>;
  let skillControllerService: SkillControllerService;

  class MockDialogRef {
    close() {}
  }

  class MockSkillControllerService {
    create(skill: Skill) {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSkillComponent],
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        { provide: SkillControllerService, useClass: MockSkillControllerService }
      ],
      imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule]
    }).compileComponents();
    skillControllerService = TestBed.get(SkillControllerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not create', ()=> {
      expect(!component).toBeFalsy();
    })

    it('should contain a input field for skill name', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.skill-name-input')).toBeTruthy();
    });

    it('should contain a button labeled Add SKill', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.add-skill-button').textContent).toContain('Add Skill');
    });

    it('should contain a button to close dialog', ()=> {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.close-dialog-button')).toBeTruthy();
    });

    it('should create a new skill object when the new skill method is called', () => {
      component.newSkill();
      fixture.detectChanges();
      expect(component.skill.skillName).toBe('');
    });

    it('should addSkill', () => {
      // skillControllerService.create(this.skill).toPromise().then(skills => {
      spyOn(component, 'addSkill');
      fixture.detectChanges();
      expect(component.skill).toBeTruthy();
      });

    it('should closeDialog', () => {
      component.closeDialog();
      fixture.detectChanges();
      expect(component.closeDialog).toBeTruthy();
    });
});
