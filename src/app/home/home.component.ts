import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeactivateService } from '../services/deactivate.service';
import { CustomerService } from '../services/customer.service';
import { StatusSummary } from '../model/StatusSummary';
import { StatusEnum } from '../model/StatusEnum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionId: string = null;
  deactivationCount: number = 0;
  summaryList: StatusSummary[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deactivateService: DeactivateService,
    private customreService: CustomerService,
    private route: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.customreService.sessionId = params['sessionId'];
      });
    }

  ngOnInit() {
    this.loadSummary();
  }

  createRequest() {
    this.router.navigate(['/', 'deactivate']);
  }

  viewReports() {
    this.router.navigate(['/', 'report']);
  }

  loadSummary(){
    this.deactivateService.getStatusSummary(this.customreService.getCompanyId()).subscribe(summary => {
      this.summaryList.push({deviceCount: 0, requestCount: 0, status: 0});
      this.summaryList.push({deviceCount: 0, requestCount: 0, status: 1});
      this.summaryList.push({deviceCount: 0, requestCount: 0, status: 2});
      let summ: StatusSummary[] = summary;

      this.deactivationCount = 0;
      for(let s of summ){
        this.deactivationCount += s.deviceCount;
        switch(s.status) {
          case StatusEnum.PENDING_APPROVAL:
          this.summaryList[0] = s;
          break;
          case StatusEnum.CUSTOMER_APPROVAL:
          this.summaryList[1] = s;
          break;
          case StatusEnum.PENDING_WIRELSS:
          this.summaryList[2] = s;
          break;
        }
      }
    });
  }

  viewStatusReport(status: number) {
    this.router.navigate(['/', 'report'], {queryParams: {filterColumn: 'status', filterValue:status}});
  }

}
