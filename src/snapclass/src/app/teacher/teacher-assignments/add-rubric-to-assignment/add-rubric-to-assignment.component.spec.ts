import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRubricToAssignmentComponent } from './add-rubric-to-assignment.component';

describe('AddRubricToAssignmentComponent', () => {
  let component: AddRubricToAssignmentComponent;
  let fixture: ComponentFixture<AddRubricToAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRubricToAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRubricToAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
