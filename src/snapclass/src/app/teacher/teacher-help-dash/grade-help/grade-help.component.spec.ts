import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeHelpComponent } from './grade-help.component';

describe('GradeHelpComponent', () => {
  let component: GradeHelpComponent;
  let fixture: ComponentFixture<GradeHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
