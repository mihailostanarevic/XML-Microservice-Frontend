import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitRedirectComponent } from './limit-redirect.component';

describe('LimitRedirectComponent', () => {
  let component: LimitRedirectComponent;
  let fixture: ComponentFixture<LimitRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
