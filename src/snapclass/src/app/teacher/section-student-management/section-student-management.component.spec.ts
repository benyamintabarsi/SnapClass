import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStudentManagementComponent } from './section-student-management.component';

describe('SectionStudentManagementComponent', () => {
  let component: SectionStudentManagementComponent;
  let fixture: ComponentFixture<SectionStudentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionStudentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStudentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
