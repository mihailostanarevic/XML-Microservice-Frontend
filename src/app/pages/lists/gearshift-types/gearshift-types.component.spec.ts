import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearshiftTypesComponent } from './gearshift-types.component';

describe('GearshiftTypesComponent', () => {
  let component: GearshiftTypesComponent;
  let fixture: ComponentFixture<GearshiftTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearshiftTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearshiftTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
