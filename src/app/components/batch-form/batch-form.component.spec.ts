import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchFormComponent } from './batch-form.component';

describe('BatchFormComponent', () => {
  let component: BatchFormComponent;
  let fixture: ComponentFixture<BatchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
