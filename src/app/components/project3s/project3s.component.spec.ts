import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Project3sComponent } from './project3s.component';

describe('Project3sComponent', () => {
  let component: Project3sComponent;
  let fixture: ComponentFixture<Project3sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Project3sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Project3sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
