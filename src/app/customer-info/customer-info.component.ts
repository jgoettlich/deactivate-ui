import { Component, OnInit } from '@angular/core';
import { CustomerInfo } from '../model/CustomerInfo';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  customerInfo: CustomerInfo;

  constructor(private customerService: CustomerService) 
  { 
      this.customerInfo = new CustomerInfo();
  }

  ngOnInit() {
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.customerService.getCustomerInfo(this.customerService.getCompanyId()).subscribe(info => {
      this.customerInfo.loadData(info);
    });
  }

}
