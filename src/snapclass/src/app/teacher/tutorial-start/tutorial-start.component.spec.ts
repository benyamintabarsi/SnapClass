import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialStartComponent } from './tutorial-start.component';

describe('TutorialStartComponent', () => {
  let component: TutorialStartComponent;
  let fixture: ComponentFixture<TutorialStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
