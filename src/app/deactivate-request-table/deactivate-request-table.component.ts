import { Component, OnInit } from '@angular/core';
import { DeactivateRequest } from '../model/deactivate-request';
import { CustomerService } from '../services/customer.service';
import { DeactivateService } from '../services/deactivate.service';
import { DeactivationReport } from '../model/DeactivationReport';
import { Device } from '../model/device';

@Component({
  selector: 'app-deactivate-request-table',
  templateUrl: './deactivate-request-table.component.html',
  styleUrls: ['./deactivate-request-table.component.css']
})
export class DeactivateRequestTableComponent implements OnInit {

  requestList : DeactivateRequest[] = [];
  pageNumber: number = 0;
  pageSize: number = 20;
  showReportLoading: boolean = false;
  isEditable: boolean = false;
  showOnlyPending: boolean = false;
  hasLoaded: boolean = false;
  clearIfEmpty: boolean = false;

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
