import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../model/device';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.css']
})
export class DeviceTableComponent implements OnInit {

  @Input() deviceList: Device[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  updateStatus(device : Device){

  }



}
