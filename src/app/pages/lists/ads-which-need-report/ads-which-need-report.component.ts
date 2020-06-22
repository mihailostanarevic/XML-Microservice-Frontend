import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-ads-which-need-report',
  templateUrl: './ads-which-need-report.component.html',
  styleUrls: ['./ads-which-need-report.component.css']
})
export class AdsWhichNeedReportComponent implements OnInit {

  private user: any;
  listOfData = [];

  constructor(private router: Router, private message: NzMessageService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  private setupData(): void {
    this.reportService.getAllRequestAdsWhichNeedReport(this.user.id).subscribe(data => {
      this.listOfData = data;
    })
  }

  writeReport(id): void {
    this.router.navigateByUrl(`dashboard/report/${id}/request-ad`);
  }

  replace(date): String {
    var str = String(date);
    var res = str.replace(",", "/");
    var ress = res.replace(",", "/"); 
    return ress;
  }
}
