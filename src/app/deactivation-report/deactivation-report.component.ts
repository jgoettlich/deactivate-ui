import { Component, OnInit } from '@angular/core';
import { DeactivationReport } from '../shared/DeactivationReport';
import { DeactivateService } from '../shared/deactivate.service';
import { CustomerService } from '../shared/customer.service';
import { Device } from '../shared/device';

@Component({
  selector: 'app-deactivation-report',
  templateUrl: './deactivation-report.component.html',
  styleUrls: ['./deactivation-report.component.css']
})
export class DeactivationReportComponent implements OnInit {
  swapRequests: DeactivationReport[] = [];
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
    this.deactivateService.getSwapReport(this.customerService.getCompanyId(), this.pageNumber, this.pageSize, this.showOnlyPending).subscribe(results => {
      this.showReportLoading = false;
      if(results != null){
        if(results.length > 0){
          this.swapRequests = results;
        }
        else if(this.clearIfEmpty){
          this.clearIfEmpty = false;
          this.swapRequests = [];
        }
      }
      else{
        this.swapRequests = [];
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

    this.deactivateService.updateRequestStatus(request).subscribe(response => {});
  }

  undoRequest(request: DeactivationReport){
    let device: Device = {
      cid : this.customerService.getCompanyId(),
      dsn : request.dsn,
      status : request.status,
      trucknum :  request.trucknum,
      vid : request.vid
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
      vid : request.vid
    };

    this.deactivateService.cancelRequest(device).subscribe(resp => {
      this.clearIfEmpty = true;
      this.getReport();
    });
  }

}
