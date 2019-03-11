import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';

import { LocationAddDialogComponent } from './location-add-dialog.component';
import { AppMaterialModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
class MatStub {
  addType: any;
  building: any;
  location: any;
  room: any;
}

class diagStub {
  close() {}
}

describe('AddDialogComponent', () => {
  let component: LocationAddDialogComponent;
  let fixture: ComponentFixture<LocationAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, AppMaterialModule, BrowserAnimationsModule, HttpClientTestingModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LocationAddDialogComponent],
      providers: [{ provide: MatDialogRef, useClass: diagStub }, { provide: MAT_DIALOG_DATA, useClass: MatStub }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAddDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    component.addType = 'location';
    component.ngOnInit();
    expect(component.typeContent).toBe(component.data.location);
    component.addType = 'building';
    component.ngOnInit();
    expect(component.typeContent).toBe(component.data.building);
    component.addType = 'room';
    component.ngOnInit();
    expect(component.typeContent).toBe(component.data.room);
  });
});
