import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeactivateService } from '../services/deactivate.service';
import { CustomerService } from '../services/customer.service';
import { StatusSummary } from '../model/StatusSummary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionId: string = null;
  deactivationCount: number = 10;
  summaryList: StatusSummary[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deactivateService: DeactivateService,
    private customreService: CustomerService) { 
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
      this.summaryList = summary;
      this.deactivationCount = 0;
      for(let s of this.summaryList){
        this.deactivationCount += s.deviceCount;
      }
    });
  }

}
