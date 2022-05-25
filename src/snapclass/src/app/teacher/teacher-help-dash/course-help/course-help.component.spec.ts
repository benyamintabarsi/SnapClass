import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHelpComponent } from './course-help.component';

describe('CourseHelpComponent', () => {
  let component: CourseHelpComponent;
  let fixture: ComponentFixture<CourseHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
