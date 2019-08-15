import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatDialogRef, MatDialogModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppMaterialModule } from "../../material.module";
import { Skill } from "../../model/Skill";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { AddSkillComponent } from "./add-skill.component";

import { mockSkills } from "../../../jestGlobalMocks";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { of } from "rxjs/observable/of";

class MockDialogRef {
  close() {}
}

describe("AddSkillComponent", () => {
  let component: AddSkillComponent;
  let fixture: ComponentFixture<AddSkillComponent>;
  let skillControllerService: SkillControllerService;
  let dialog: MockDialogRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSkillComponent],
      providers: [
        SkillControllerService,
        { provide: MatDialogRef},
        { provide: MatDialogRef, useClass: MockDialogRef },
      ],
      imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule, HttpClientModule],
    }).compileComponents();
    skillControllerService = TestBed.get(SkillControllerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillComponent);
    component = fixture.componentInstance;
    dialog = component.dialogRef;
    skillControllerService = TestBed.get(SkillControllerService);
    fixture.detectChanges();
  });

  it("should create", () => {
      expect(component).toBeTruthy();
    });

  it("should contain a input field for skill name", () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector(".skill-name-input")).toBeTruthy();
    });

  it("should contain a button labeled Add SKill", () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector(".add-skill-button").textContent).toContain("Add Skill");
    });

  it("should contain a button to close dialog", () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector(".close-dialog-button")).toBeTruthy();
    });

  it("should create a new skill object when the new skill method is called", () => {
      component.newSkill();
      fixture.detectChanges();
      expect(component.skill.name).toBe("");
    });

  it("should addSkill", () => {
      // skillControllerService.create(this.skill).toPromise().then(skills => {
      spyOn(skillControllerService, "create").and.returnValue(of(HttpResponse));
      component.skill = mockSkills[0];
      component.addSkill();
      fixture.detectChanges();
      expect(skillControllerService.create).toHaveBeenCalledTimes(1);
      });

  it("should closeDialog", () => {
      spyOn(dialog, "close");
      component.closeDialog();
      fixture.detectChanges();
      expect(dialog.close).toHaveBeenCalledTimes(1);
    });
});
