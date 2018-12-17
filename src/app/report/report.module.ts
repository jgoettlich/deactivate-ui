import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DeactivationReportComponent } from '../deactivation-report/deactivation-report.component';
import { ReportHomeComponent } from '../report-home/report-home.component';
import { LoadingContainerComponent } from '../loading-container/loading-container.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    ReportHomeComponent,
    DeactivationReportComponent,
    LoadingContainerComponent
  ],
  exports: [
    DeactivationReportComponent,
    LoadingContainerComponent
  ]
})
export class ReportModule { }
