import { Component, OnInit } from '@angular/core';
import { DeactivateRequest } from '../model/DeactivateRequest';
import { CustomerInfo } from '../model/CustomerInfo';
import { CustomerService } from '../services/customer.service';
import { ContractDate } from '../model/ContractData';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-etf-estimater',
  templateUrl: './etf-estimater.component.html',
  styleUrls: ['./etf-estimater.component.css']
})
export class EtfEstimaterComponent implements OnInit {

  requestDetails: DeactivateRequest;
  customerInfo: CustomerInfo;
  contractData: ContractDate[] = [];
  termTotal: number = 0;
  monthlyRatePlan: number = 40;
  fixedEtf: number = 300;
  monthChurning: Date;
  serviceSubTotal: number = 0;
  suspendedExtensionSubtotal: number = 0;
  preTaxTotal: number = 0;
  unitSuspendedMonths: number = 0;

  constructor(private customerService: CustomerService) { 
  }

  ngOnInit() {
    this.requestDetails = <DeactivateRequest>{};
    this.requestDetails = {
      cid: 57,
      cm_notes: null,
      completedDate: null,
      createdDate: null,
      cust_notes: null,
      deviceList: null,
      fee: 0,
      reason: null,
      requestId: null,
      requestedDate: null,
      sessionId: null,
      status: null,
      userId: null,
      username: null
    };

    this.customerInfo = new CustomerInfo();

    this.getCustomerInfo();
    this.getCustomerContractData();
  }

  updateLineFees(value: number) {
    this.calculateTermsLessChurn();
    this.calculateFees();
  }

  getCustomerInfo() {
    this.customerService.getCustomerInfo(this.customerService.companyId).subscribe(info => {
      this.customerInfo.loadData(info);
    });
  }

  getCustomerContractData() {
    this.customerService.getCustomerContractData(this.customerService.companyId).subscribe(info => {
      this.contractData = info;
      this.termTotal = 0;
      for(let c of this.contractData) {
        c.contractEnd = new Date(c.contractEnd);
        this.termTotal += c.terms;
      }
      this.calculateMonthsRemaining();
      this.calculateTermsLessChurn();
      this.calculateFees();
    });
  }

  calculateTermsLessChurn() {
    for(let i=0;i<this.contractData.length;i++){
      let current = this.contractData[i];
      let prev = (i == 0)? null : this.contractData[i-1];

      if(prev != null){
          if(current.month == prev.month) {
          if(prev.contractType == "Churn / Return"){
            current.termsLessChurn = current.terms + prev.terms;
          }
          else {
            current.termsLessChurn = current.terms;
          }
        }
      }
      else {
        current.termsLessChurn = current.terms;
      }
    }
  }

  calculateMonthsRemaining() {
    for(let cData of this.contractData){
      if(cData.termsLessChurn == 0 || cData.termsLessChurn == null) {
        cData.monthsRemaining = 0;
        continue;
      }

      if(this.monthChurning != null){
        if(cData.contractEnd < this.monthChurning){
          let plusYear : Date = cData.contractEnd;
          plusYear.setFullYear(plusYear.getFullYear() + 1);
          cData.monthsRemaining = this.dateDiffInMonths(this.monthChurning, plusYear);
        }
        else {
          cData.monthsRemaining = this.dateDiffInMonths(this.monthChurning, cData.contractEnd);
        }
      }
      else {
        let today: Date = new Date();
        if(cData.contractEnd < today) {
          let plusYear : Date = cData.contractEnd;
          plusYear.setFullYear(plusYear.getFullYear() + 1);
          cData.monthsRemaining = this.dateDiffInMonths(today, plusYear);
        }
        else {
          cData.monthsRemaining = this.dateDiffInMonths(today, cData.contractEnd);
        }
      }
    }
  }

  dateDiffInMonths(d1: Date, d2: Date) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return (d2M+12*d2Y)-(d1M+12*d1Y);
  }

  calculateFees() {
    for(let cData of this.contractData){
      let feeByMonth = this.monthlyRatePlan * cData.monthsRemaining;
      cData.perUnitTermFee = (feeByMonth > this.fixedEtf)? this.fixedEtf: feeByMonth;
      cData.totalTermFee = cData.perUnitTermFee * cData.termsLessChurn;
    }

    this.calculateTotals();
  }

  chosenMonthHandler(normlizedMonth: Date, datepicker: MatDatepicker<Date>) {
    this.monthChurning = normlizedMonth;
    datepicker.close();
    this.calculateMonthsRemaining();
    this.calculateFees();
  }

  calculateTotals() {
    this.serviceSubTotal = 0;
    for(let cData of this.contractData) {
      this.serviceSubTotal += cData.totalTermFee;
    }

    this.suspendedExtensionSubtotal = this.unitSuspendedMonths * this.monthlyRatePlan;

    this.preTaxTotal = this.serviceSubTotal + this.suspendedExtensionSubtotal;
  }

}
