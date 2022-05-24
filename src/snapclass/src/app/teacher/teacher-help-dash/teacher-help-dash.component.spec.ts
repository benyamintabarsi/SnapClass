import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHelpDashComponent } from './teacher-help-dash.component';

describe('TeacherHelpDashComponent', () => {
  let component: TeacherHelpDashComponent;
  let fixture: ComponentFixture<TeacherHelpDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHelpDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHelpDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
