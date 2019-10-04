import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { Component } from "@angular/core";
import { BatchFormComponent } from "./batch-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { TrainerControllerService } from "../../services/api/trainer-controller/trainer-controller.service";
import { AddressControllerService } from "../../services/api/address-controller/address-controller.service";
import { BuildingControllerService } from "../../services/api/building-controller/building-controller.service";
import { RoomControllerService } from "../../services/api/room-controller/room-controller.service";
import { FinalProjectControllerService } from "../../services/api/final-project-controller/final-project-controller.service";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
/** created the spec file because there was no testing file for this component. Also, this form was likely intended
 * to replace the form in the batches.component, which declares a formGroup element with fields identical to the formControlNames
 * found in this component. - Sam J
 */
describe('BatchFormComponent', ()=>{
    let component: BatchFormComponent;
    let fixture: ComponentFixture<BatchFormComponent>


 beforeEach(async()=>{
     TestBed.configureTestingModule({
         declarations: [BatchFormComponent],
         imports: [BrowserAnimationsModule ,MatNativeDateModule,HttpClientTestingModule ,MatDatepickerModule ,ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule],
         providers: [HttpClient, SkillControllerService,FinalProjectControllerService,RoomControllerService,BuildingControllerService,AddressControllerService ,TrainerControllerService,CurriculumControllerService ,SettingControllerService]

     })
     .compileComponents();
 })

 beforeEach(()=>{
     let http = TestBed.get(HttpClientTestingModule);
     fixture = TestBed.createComponent(BatchFormComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
 })

 it('(Sam) should create', ()=>{
     expect(component).toBeTruthy();
 })
})