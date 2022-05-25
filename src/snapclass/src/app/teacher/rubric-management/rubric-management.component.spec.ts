import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricManagementComponent } from './rubric-management.component';

describe('RubricManagementComponent', () => {
  let component: RubricManagementComponent;
  let fixture: ComponentFixture<RubricManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubricManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
