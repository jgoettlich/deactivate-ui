import { Component, OnInit, ViewChild } from '@angular/core';
import { DeactivateService } from '../services/deactivate.service';
import { Device } from '../model/device';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeactivateRequest } from '../model/DeactivateRequest';
import { CustomerService } from '../services/customer.service';
import { MatNativeDateModule } from '@angular/material';
import { DeactivateFormComponent } from '../deactivate-form/deactivate-form.component';

@Component({
  selector: 'app-deactivate-device',
  templateUrl: './deactivate-device.component.html',
  styleUrls: ['./deactivate-device.component.css']
})
export class DeactivateDeviceComponent implements OnInit {
  truckListStr: string          = null;
  badNames: string[]            = [];
  deviceList: Device[]          = [];
  selectedDeviceList: Device[]  = [];
  pageNumber: number            = 0;
  pageSize: number              = 10;
  isProcessing: boolean         = false;
  processCount: number          = 0;
  processedCount: number        = 0;
  showModalLoading: boolean     = false;
  showDeviceLoading: boolean    = false;
  showSwapLoading: boolean      = false;
  pageBtnClicked: boolean       = false;
  isEditable: boolean           = false;
  requestStep: number           = 0;
  requestId: string             = null;

  @ViewChild("requestForm") requestForm : DeactivateFormComponent;
  @ViewChild("confirmDialog") confirmDialog : any;

  constructor(private deactivateService: DeactivateService,
    private modalService: NgbModal,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.onCompanyChanged.addListener('companyChanged', (evt) => { 
      this.getDeviceList();
     });
    this.getDeviceList();
  }

  getDeviceList(){
    this.showDeviceLoading = true;
    this.deactivateService.getDeviceList(this.customerService.getCompanyId(), this.pageNumber, this.pageSize).subscribe(retDevices => {
      this.showDeviceLoading = false;
      this.pageBtnClicked = false;
      if(retDevices != null){
        if(retDevices.length > 0){
          this.deviceList = retDevices;
        }
        else if(!this.pageBtnClicked){
          this.deviceList = [];
        }
      }
      else{
        this.deviceList = [];
      }
    });
  }

  getNextPage(){
    this.pageNumber += this.pageSize;
    this.pageBtnClicked = true;
    this.getDeviceList();
  }

  getPreviousPage(){
    this.pageNumber -= this.pageSize;
    
    if(this.pageNumber < 0){
      this.pageNumber = 0;
      return;
    }
    this.pageBtnClicked = true;
    this.getDeviceList();
  }

  addRow(device: Device){
    let index : number = this.getSelectedDeviceIndex(device.dsn);

    if(index < 0){
      this.selectedDeviceList.push(device);
    }
  }

  removeRow(device : Device){
    let index : number = this.getSelectedDeviceIndex(device.dsn);
    if(index >= 0){
      this.selectedDeviceList.splice(index, 1);
    }
  }

  getSelectedDeviceIndex(dsn: number): number{
    let index = 0;
    for(let d of this.selectedDeviceList){
      if(d.dsn == dsn){
        return index;
      }
      index++;
    }
    return -1;
  }

  open(content) {
    this.resetModal();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
    }, () => {
    });
  }

  resetModal(){
    this.badNames         = [];
    this.isProcessing     = false;
    this.truckListStr     = '';
    this.processCount     = 0;
    this.processedCount   = 0;
    this.showModalLoading = false;
  }

  // Modal Functions
  processTrucks(){
    this.isProcessing = true;
    this.showModalLoading = true;
    let truckList: string[] = this.truckListStr.split('\n');
    this.processCount = truckList.length;

    for(let i=0;i<truckList.length;i++){
      let trimmedName: string = truckList[i].trim();
      this.deactivateService.findDevice(this.customerService.getCompanyId(), trimmedName).subscribe(data => {
        this.processedCount++;
        if(this.processedCount >= this.processCount){
          this.showModalLoading = false;
        }
        if(data != null){
          let device: Device = data[0];
          if(device.dsn == null){
            this.badNames.push(device.trucknum);
          }
          else{
            this.addRow(device);
          }
        }
      });
    }
  }

  deactivateDevices(){
      let deactivateRequest: DeactivateRequest = {
        sessionId: '',
        cid: this.customerService.getCompanyId(),
        cm_notes: (this.isEditable)? this.requestForm.requestNotes : null,
        cust_notes: (!this.isEditable)? this.requestForm.requestNotes : null,
        completedDate: null,
        reason: 0,
        createdDate: null,
        status: 0,
        userId: null,
        requestId: null,
        username: '',
        deviceList: this.selectedDeviceList,
        fee: 0,
        requestedDate: this.requestForm.requestedDate
      };

      this.deactivateService.deactivateDevice(deactivateRequest).subscribe(response => {
        this.selectedDeviceList = [];
        this.requestId = response;
      });
  }

  confirmRequest() {

  }

  selectDevicesClick() {
    this.requestStep = 1;
  }

  backToForm() {
    this.requestStep = 0;
  }
}
