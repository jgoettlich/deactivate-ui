import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DeactivateRequest } from '../model/DeactivateRequest';
import { DeactivateService } from '../services/deactivate.service';
import { DeviceTableComponent } from '../device-table/device-table.component';
import { CustomerService } from '../services/customer.service';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { StatusEnum } from '../model/StatusEnum';
import { CdkStep } from '@angular/cdk/stepper';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  isManager       : boolean = false;
  requestDetails  : DeactivateRequest = null;
  requestId       : string = null;
  lineFee         : number;
  currentStep     : number = -1;
  
  @ViewChild('stepper') stepper: MatStepper;

  @ViewChild('deviceTable') deviceTable : DeviceTableComponent;

  constructor(private deactivateService: DeactivateService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) { 

      this.requestDetails = {
        cid : 0,
        cm_notes: '',
        completedDate: '',
        cust_notes: '',
        deviceList: [],
        reason: 0,
        createdDate: '',
        requestId: '',
        sessionId: '',
        status: 0,
        userId: 0,
        username: '',
        fee: 0,
        requestedDate: null
      };

      this.activatedRoute.queryParams.subscribe(params => {
        this.requestId = params['requestId'];
      });
  }

  ngOnInit() {
    this.isManager = this.customerService.isCustomerManager;
    this.deviceTable.isEditable = this.isManager;
    this.getRequestDetails();
  }

  getRequestDetails() {
    if(this.requestId == ''){
      return;
    }

    this.deactivateService.getDeactivateRequest(this.requestId, this.customerService.getCompanyId()).subscribe(request => {
      this.requestDetails = request;
      this.deviceTable.setRequest(request);
      let status : number = this.requestDetails.status;
      let stepIndex : number = this.requestDetails.status;

      this.stepper.steps.forEach(function(step: CdkStep, index: number, array: CdkStep[]){
        if(index < status || status == StatusEnum.COMPLETED){
          step.completed = true;
        }
      });

      this.stepper.selectedIndex = stepIndex;
      this.currentStep = stepIndex;
    });
  }

  setRequest(request : DeactivateRequest) {
    this.requestDetails = request;
  }

  close() {
    // go back
  }

  sumLines(){
    this.requestDetails.fee = this.deviceTable.calculateSum();
    this.deactivateService.updateRequest(this.requestDetails).subscribe(response => {});
  }

  updateLineFees(value: number){
    this.deviceTable.setDeviceFees(value);
    this.sumLines();
  }

  sendToNextStep() {
    
  }

}
