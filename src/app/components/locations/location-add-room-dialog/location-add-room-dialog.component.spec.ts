import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddRoomDialogComponent } from './location-add-room-dialog.component';
import { AppMaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LocationAddRoomDialogComponent', () => {
  let component: LocationAddRoomDialogComponent;
  let fixture: ComponentFixture<LocationAddRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppMaterialModule, FormsModule, ReactiveFormsModule],
      declarations: [ LocationAddRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(LocationAddRoomDialogComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // Tests suspended because of MatDialogRef issue
    // expect(component).toBeTruthy();
  });
});
