import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricPageComponent } from './rubric-page.component';

describe('RubricPageComponent', () => {
  let component: RubricPageComponent;
  let fixture: ComponentFixture<RubricPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubricPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
