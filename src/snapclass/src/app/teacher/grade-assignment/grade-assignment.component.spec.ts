import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAssignmentComponent } from './grade-assignment.component';

describe('GradeAssignmentComponent', () => {
  let component: GradeAssignmentComponent;
  let fixture: ComponentFixture<GradeAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
