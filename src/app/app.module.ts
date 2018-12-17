import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DeactivateDeviceComponent } from './deactivate-device/deactivate-device.component';
import { DeactivateService } from './shared/deactivate.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoadingContainerComponent } from './loading-container/loading-container.component';
import { CustomerService } from './shared/customer.service';
import { ReportHomeComponent } from './report-home/report-home.component';
import { ReportModule } from './report/report.module';
import { InternalHomeComponent } from './internal-home/internal-home.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeactivateDeviceComponent,
    InternalHomeComponent,
    CustomerInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReportModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'swapdevice', component: DeactivateDeviceComponent },
      { path: 'report', component: ReportHomeComponent },
      { path: 'internal', component: InternalHomeComponent }
    ])
  ],
  providers: [
    DeactivateService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
