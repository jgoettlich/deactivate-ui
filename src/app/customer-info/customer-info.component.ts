import { Component, OnInit } from '@angular/core';
import { CustomerInfo } from '../model/CustomerInfo';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  customerInfo: CustomerInfo;

  constructor(private customerService: CustomerService,
    private router : Router) 
  { 
      this.customerInfo = new CustomerInfo();
  }

  ngOnInit() {
    this.customerService.onCompanyChanged.addListener('managerChanged', (evt) => {
      if(evt.value == true){
        this.getCustomerInfo();
      }
     });
     
     if(this.customerService.isCustomerManager == false){
      this.router.navigate(['home']);
      return;
     }

    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.customerService.getCustomerInfo(this.customerService.getCompanyId()).subscribe(info => {
      this.customerInfo.loadData(info);
    });
  }

}
