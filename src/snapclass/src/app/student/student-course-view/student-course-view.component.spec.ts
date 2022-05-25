import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseViewComponent } from './student-course-view.component';

describe('StudentCourseViewComponent', () => {
  let component: StudentCourseViewComponent;
  let fixture: ComponentFixture<StudentCourseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
