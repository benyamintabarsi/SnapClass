import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssignmentToGradeComponent } from './select-assignment-to-grade.component';

describe('SelectAssignmentToGradeComponent', () => {
  let component: SelectAssignmentToGradeComponent;
  let fixture: ComponentFixture<SelectAssignmentToGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAssignmentToGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAssignmentToGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
