import { Component, OnInit, ViewChild } from '@angular/core';
import { DeactivationReportComponent } from '../deactivation-report/deactivation-report.component';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.css']
})
export class ReportHomeComponent implements OnInit {

  @ViewChild("pendingReport") pendingReport: DeactivationReportComponent;
  @ViewChild("fullReport") fullReport: DeactivationReportComponent;
  
  reportShown: number = 0;
  constructor() { }

  ngOnInit() {
    this.pendingReport.showOnlyPending = true;
    this.fullReport.showOnlyPending = false;
    this.pendingReport.getReport();
  }

  changeReport(report: number){
    this.reportShown = report;

    if(report == 0){
      if(!this.pendingReport.hasLoaded){
        this.pendingReport.getReport();
      }
    }

    if(report == 1){
      if(!this.fullReport.hasLoaded){
        this.fullReport.getReport();
      }
    }
  }

}
