import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TrainersAddComponent } from './trainers-add.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMaterialModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TrainersComponent } from '../trainers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Trainer } from '../../../model/Trainer';
import { Skill } from '../../../model/Skill';
import { TrainerControllerService } from '../../../services/api/trainer-controller/trainer-controller.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

describe('TrainersAddComponent', () => {
  let component: TrainersAddComponent;
  let fixture: ComponentFixture<TrainersAddComponent>;
  let fb;
  let dialog;
  let trainerService: TrainerControllerService;
  let addTrainerForm: FormGroup;

  class MockTrainerService {
    createTrainer(trainer: Trainer) { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainersAddComponent],
      imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule],
      providers: [
        {
          provide: TrainerControllerService,
          useClass: MockTrainerService
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { trainer: null, curricula: [] }
        }, {
          provide: MatDialogRef,
          useValue: dialog
        }
      ]
    });

    fixture = TestBed.createComponent(TrainersAddComponent);
    fb = fixture.debugElement.injector.get(FormBuilder);
    dialog = fixture.debugElement.injector.get(MatDialogRef);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onNoClick', () => {
    spyOn(component, 'onNoClick');
    component.onNoClick(new Event('test'));
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('should call onSubmit', () => {
    spyOn(component, 'onSubmit');
    component.onSubmit({}, true);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit with no skills should equal empty array', () => {
    spyOn(component, 'onSubmit');
    let formVal = {firstName: "first", lastName: "last", email: "test@email.com", skills: null};
    component.onSubmit(formVal, true);
    fixture.detectChanges();
    expect(component.trainer.skills).toEqual([]);
  });


  it('should call skillChange', () => {
    spyOn(component, 'skillChange');
    component.skillChange(true,{});
    expect(component.skillChange).toHaveBeenCalled();
  });


});
