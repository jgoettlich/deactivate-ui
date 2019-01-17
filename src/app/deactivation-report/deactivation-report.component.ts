import { Component, OnInit, ViewChild } from '@angular/core';
import { DeactivateService } from '../services/deactivate.service';
import { CustomerService } from '../services/customer.service';
import { DeviceTableComponent } from '../device-table/device-table.component';
import { DeactivateRequest } from '../model/DeactivateRequest';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deactivation-report',
  templateUrl: './deactivation-report.component.html',
  styleUrls: ['./deactivation-report.component.css']
})
export class DeactivationReportComponent implements OnInit {
  requestList: DeactivateRequest[] = [];
  pageNumber: number = 0;
  pageSize: number = 20;
  showReportLoading: boolean = false;
  isEditable: boolean = false;
  showOnlyPending: boolean = false;
  hasLoaded: boolean = false;
  clearIfEmpty: boolean = false;
  sortColumn: string = 'createdDate';
  sortAsc: boolean = true;
  filterColumn: string = null;
  filterValue: any = null;

  @ViewChild("deviceTable") deviceTable : DeviceTableComponent;

  constructor(private deactivateService: DeactivateService,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.filterColumn = params['filterColumn'];
        this.filterValue = params['filterValue'];
      });
    }

  ngOnInit() {
  }

  getReport(){
    this.hasLoaded = true;
    this.showReportLoading = true;
    this.deactivateService.getDeactivateReport(this.customerService.getCompanyId(), 
    this.pageNumber, this.pageSize, 
    this.showOnlyPending, this.sortColumn, 
    this.sortAsc, this.filterColumn, this.filterValue).subscribe(results => {
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

  viewDetails(request: DeactivateRequest) {
    this.router.navigate(['/', 'deactivateRequest'], { queryParams: { requestId: request.requestId } });
  }

  updateStatus(request: DeactivateRequest) {
    this.deactivateService.updateRequest(request).subscribe(response => {});
  }

  undoRequest(request: DeactivateRequest){
    this.deactivateService.cancelRequest(request).subscribe(resp => {
      this.clearIfEmpty = true;
      this.getReport();
    });
  }

  cancelRequest(request: DeactivateRequest) {
    this.deactivateService.cancelRequest(request).subscribe(resp => {
      this.clearIfEmpty = true;
      this.getReport();
    });
  }

  setSort(columnName: string){
    if(this.sortColumn == columnName){
      this.sortAsc = !this.sortAsc;
      document.getElementById(columnName + 'Arrows').className = (this.sortAsc)? "fa fa-fw fa-sort-asc" : "fa fa-fw fa-sort-desc";
    }
    else {
      document.getElementById(this.sortColumn + 'Arrows').className = "fa fa-fw fa-sort";
      this.sortColumn = columnName;
      this.sortAsc = true;
      document.getElementById(columnName + 'Arrows').className = "fa fa-fw fa-sort-asc";
    }

    this.getReport();
  }

  createNewRequest() {

  }

}
