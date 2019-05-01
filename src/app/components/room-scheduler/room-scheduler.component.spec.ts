import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSchedulerComponent } from './room-scheduler.component';

describe('RoomSchedulerComponent', () => {
  let component: RoomSchedulerComponent;
  let fixture: ComponentFixture<RoomSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
