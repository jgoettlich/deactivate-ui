import { Component, OnInit, ViewChild } from '@angular/core';
import { DeactivationReportComponent } from '../deactivation-report/deactivation-report.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';

@Component({
  selector: 'app-internal-home',
  templateUrl: './internal-home.component.html',
  styleUrls: ['./internal-home.component.css']
})
export class InternalHomeComponent implements OnInit {
  tabShown: number = 3;
  @ViewChild("pendingReport") pendingReport: DeactivationReportComponent;

  constructor() { }

  ngOnInit() {
    this.pendingReport.isEditable = true;
    this.pendingReport.getReport();
  }

  changeTab(tab: number) {
    this.tabShown = tab;
    this.pendingReport.isEditable = true;

    if(tab == 0){
      if(!this.pendingReport.hasLoaded){
        this.pendingReport.getReport();
      }
    }
  }

}
