import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearshiftTypeComponent } from './gearshift-type.component';

describe('GearshiftTypeComponent', () => {
  let component: GearshiftTypeComponent;
  let fixture: ComponentFixture<GearshiftTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearshiftTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearshiftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
