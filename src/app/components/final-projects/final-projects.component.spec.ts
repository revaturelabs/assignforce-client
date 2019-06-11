import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalProjectsComponent } from './final-projects.component';

describe('FinalProjectsComponent', () => {
  let component: FinalProjectsComponent;
  let fixture: ComponentFixture<FinalProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
