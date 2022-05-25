import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRubricComponent } from './add-rubric.component';

describe('AddRubricComponent', () => {
  let component: AddRubricComponent;
  let fixture: ComponentFixture<AddRubricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRubricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
