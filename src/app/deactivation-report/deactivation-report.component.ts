import { Component, OnInit, ViewChild } from '@angular/core';
import { DeactivationReport } from '../model/DeactivationReport';
import { DeactivateService } from '../services/deactivate.service';
import { CustomerService } from '../services/customer.service';
import { Device } from '../model/device';
import { DeactivateRequestTableComponent } from '../deactivate-request-table/deactivate-request-table.component';
import { DeviceTableComponent } from '../device-table/device-table.component';

@Component({
  selector: 'app-deactivation-report',
  templateUrl: './deactivation-report.component.html',
  styleUrls: ['./deactivation-report.component.css']
})
export class DeactivationReportComponent implements OnInit {
  requestList: DeactivationReport[] = [];
  pageNumber: number = 0;
  pageSize: number = 20;
  showReportLoading: boolean = false;
  isEditable: boolean = false;
  showOnlyPending: boolean = false;
  hasLoaded: boolean = false;
  clearIfEmpty: boolean = false;

  @ViewChild("deviceTable") deviceTable : DeviceTableComponent;

  constructor(private deactivateService: DeactivateService,
    private customerService: CustomerService) { }

  ngOnInit() {
  }

  getReport(){
    this.hasLoaded = true;
    this.showReportLoading = true;
    this.deactivateService.getDeactivateReport(this.customerService.getCompanyId(), this.pageNumber, this.pageSize, this.showOnlyPending).subscribe(results => {
      this.showReportLoading = false;
      if(results != null){
        if(results.length > 0){
          this.requestList = results;
        }
        else if(this.clearIfEmpty){
          this.clearIfEmpty = false;
          this.requestList = [];
        }
      }
      else{
        this.requestList = [];
      }
    });
  }

  refreshReport(){
    this.pageNumber = 0;
    this.getReport();
  }

  getNextPage(){
    this.pageNumber += this.pageSize;
    this.getReport();
  }

  getPreviousPage(){
    this.pageNumber -= this.pageSize;
    
    if(this.pageNumber < 0){
      this.pageNumber = 0;
      return;
    }
    this.getReport();
  }

  showDetails(request: DeactivationReport) {
    
  }

  updateStatus(request: DeactivationReport) {
    this.deactivateService.updateRequest(request).subscribe(response => {});
  }

  undoRequest(request: DeactivationReport){
    let device: Device = {
      cid : this.customerService.getCompanyId(),
      dsn : request.dsn,
      status : request.status,
      trucknum :  request.trucknum,
      vid : request.vid,
      reason : request.reason
    };

    this.deactivateService.cancelRequest(device).subscribe(resp => {
      this.clearIfEmpty = true;
      this.getReport();
    });
  }

  cancelRequest(request: DeactivationReport) {
    let device: Device = {
      cid : this.customerService.getCompanyId(),
      dsn : request.dsn,
      status : request.status,
      trucknum :  request.trucknum,
      vid : request.vid,
      reason : request.reason
    };

    this.deactivateService.cancelRequest(device).subscribe(resp => {
      this.clearIfEmpty = true;
      this.getReport();
    });
  }

}
