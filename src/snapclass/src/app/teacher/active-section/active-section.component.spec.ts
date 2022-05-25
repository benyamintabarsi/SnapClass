import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSectionComponent } from './active-section.component';

describe('ActiveSectionComponent', () => {
  let component: ActiveSectionComponent;
  let fixture: ComponentFixture<ActiveSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
