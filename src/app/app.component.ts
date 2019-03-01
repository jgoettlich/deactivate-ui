import { Component } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Company } from './model/company';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Deactivation Mangement';
  companyList: Company[] = [];
  companySelect: string = '';

  constructor(private customerService: CustomerService){
    
    this.checkUser();
    this.getCustomerList('');
  }

  checkUser() {

  }

  getCustomerList(query: string){
    this.customerService.getCustomerList(query).subscribe(customers => {
      // Fill out the combobox
      this.companyList = customers;
    });
  }

  findCompany(value: string){
    if(value.indexOf('[') >= 0){
      let cid = this.getCompanyId(value);
      if(cid >= 0){
        this.customerService.setCompanyId(cid);
      }
    }
    else{
      this.getCustomerList(value);
    }
  }

  checkKey(key: KeyboardEvent){
    // Check for enter
    if(key.keyCode == 13){
      let cid: number = parseInt(this.companySelect);
      this.customerService.getCustomer(cid).subscribe(company => {
        this.companyList = [];
        this.companyList.push(company);
        this.customerService.setCompanyId(company.cid);
        this.companySelect = `${company.companyName.trim()} [${company.cid}]`;
      });
    }
  }

  getCompanyId(selectedValue: string): number {
    for(let c of this.companyList){
      let str = `${c.companyName} [${c.cid}]`;
      if(str.trim() == selectedValue.trim()){
        return c.cid;
      }
    }

    return -1;
  }

}
