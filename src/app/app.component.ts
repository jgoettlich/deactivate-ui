import { Component } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Company } from './model/company';
import { ActivatedRoute } from '@angular/router';
import { DeactivateService } from './services/deactivate.service';
import { SESSION_STATE } from './Enum/session-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Unit Management';
  companyList: Company[] = [];
  companySelect: string = '';
  isManager: boolean = false;
  validSession: boolean = false;
  checkedSession: boolean = false;

  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private deactivateService : DeactivateService){
      this.setToken();
  }

  setToken() {
    this.route.queryParams.subscribe( params => {
      //pfm2SessionId=2137112740&code=2137112740&customerId=57&userId=1298352
      //this.setServiceTokens('2137112740', 57);
      if(params.pfm2SessionId != null) {
        this.setServiceTokens(params.pfm2SessionId, params.customerId);
      }
      else {
        // redirect to 401 page
        this.checkedSession = true;
      }
    });
  }

  setServiceTokens(pfm2SessionId: string, customerId: number) {
    this.deactivateService.setAccessToken(pfm2SessionId);
    this.customerService.setCompanyId(customerId);
    this.customerService.sessionId = pfm2SessionId;
    this.checkUser(pfm2SessionId, customerId);
  }

  checkUser(sessionId: string, companyId: number) {
    this.customerService.validateSession(sessionId, companyId).subscribe(data => {
      let sessionState : SESSION_STATE = data;
      this.customerService.setIsManager((sessionState == SESSION_STATE.CUSTOMER_MANAGER)? true : false);
      this.isManager = (sessionState == SESSION_STATE.CUSTOMER_MANAGER)? true : false;
      this.validSession = (sessionState == SESSION_STATE.INVALID)? false : true;
      this.checkedSession = true;
    }, error => {
      // Redirect to 401 page.
      this.validSession = false;
      this.checkedSession = true;
    });
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
