import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeactivateService } from '../services/deactivate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  response: any;

  constructor(
    private router: Router,
    private deactivateService: DeactivateService) { }

  ngOnInit() {
  }

  swapDevices() {
    this.router.navigate(['/', 'deactivate']);
  }

  viewReports() {
    this.router.navigate(['/', 'report']);
  }

}
