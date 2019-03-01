import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DeactivationReportComponent } from '../deactivation-report/deactivation-report.component';
import { ReportHomeComponent } from '../report-home/report-home.component';
import { LoadingContainerComponent } from '../loading-container/loading-container.component';
import { DeviceTableComponent } from '../device-table/device-table.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';
import { RequestStatusComponent } from '../request-status/request-status.component';
import { RequestReasonComponent } from '../request-reason/request-reason.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTableModule
  ],
  declarations: [
    ReportHomeComponent,
    DeactivationReportComponent,
    DeviceTableComponent,
    LoadingContainerComponent,
    RequestDetailsComponent,
    RequestStatusComponent,
    RequestReasonComponent
  ],
  exports: [
    DeactivationReportComponent,
    LoadingContainerComponent
  ]
})
export class ReportModule { }
