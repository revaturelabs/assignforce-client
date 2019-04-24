import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainerErrorComponent } from './add-trainer-error.component';
import { MatDialogModule, MatDialogRef } from '@angular/material';

describe('AddTrainerErrorComponent', () => {
  let component: AddTrainerErrorComponent;
  let fixture: ComponentFixture<AddTrainerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ AddTrainerErrorComponent ],
      providers: [ {provide: MatDialogRef, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onNoClick', () => {
    spyOn(component, 'onNoClick');
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  });
});
