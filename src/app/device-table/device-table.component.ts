import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../model/device';
import { DeactivateService } from '../services/deactivate.service';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.css']
})
export class DeviceTableComponent implements OnInit {

  isEditable: boolean = false;
  showReportLoading: boolean = false;
  @Input() deviceList: Device[] = [];
  
  constructor(private deactivateService: DeactivateService) { }

  ngOnInit() {
  }

  updateStatus(device : Device){

  }

  undoRequest(device: Device){

    this.deactivateService.removeDeviceFromRequest(device).subscribe(resp => {
      if(resp == true){
        for(let i=0;i<this.deviceList.length;i++) {
          if(this.deviceList[i].dsn == device.dsn){
            this.deviceList.splice(i, 1);
            break;
          }
       }
      }
    });
  }

  calculateSum(): number {
    let sum : number = 0;
    for(let d of this.deviceList){
      sum += d.fee;
    }

    return sum;
  }

  setDeviceFees(fee: number){
    for(let d of this.deviceList){
      d.fee = fee;
    }
  }

  updateDeviceFees(value: number){
    this.deactivateService.updateDeviceFees(this.deviceList).subscribe(response => {
      
    });
  }

}
