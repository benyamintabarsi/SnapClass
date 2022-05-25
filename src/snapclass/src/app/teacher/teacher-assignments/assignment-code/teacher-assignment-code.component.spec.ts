import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignmentsCodeComponent } from './teacher-assignment-code.component';

describe('GradeAssignmentComponent', () => {
  let component: TeacherAssignmentsCodeComponent;
  let fixture: ComponentFixture<TeacherAssignmentsCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAssignmentsCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAssignmentsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
