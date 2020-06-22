import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarClassComponent } from './car-class.component';

describe('CarClassComponent', () => {
  let component: CarClassComponent;
  let fixture: ComponentFixture<CarClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
