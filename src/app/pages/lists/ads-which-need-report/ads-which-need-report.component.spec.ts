import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsWhichNeedReportComponent } from './ads-which-need-report.component';

describe('AdsWhichNeedReportComponent', () => {
  let component: AdsWhichNeedReportComponent;
  let fixture: ComponentFixture<AdsWhichNeedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsWhichNeedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsWhichNeedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
