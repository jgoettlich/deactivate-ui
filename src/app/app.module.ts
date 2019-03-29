import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DeactivateDeviceComponent } from './deactivate-device/deactivate-device.component';
import { DeactivateService } from './services/deactivate.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { ReportHomeComponent } from './report-home/report-home.component';
import { ReportModule } from './report/report.module';
import { InternalHomeComponent } from './internal-home/internal-home.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { EtfEstimaterComponent } from './etf-estimater/etf-estimater.component';
import { DeactivateFormComponent } from './deactivate-form/deactivate-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeactivateDeviceComponent,
    InternalHomeComponent,
    CustomerInfoComponent,
    EtfEstimaterComponent,
    DeactivateFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReportModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'deactivate', component: DeactivateDeviceComponent },
      { path: 'report', component: ReportHomeComponent },
      { path: 'internal', component: InternalHomeComponent },
      { path: 'deactivateRequest', component: RequestDetailsComponent }
    ])
  ],
  providers: [
    DeactivateService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
