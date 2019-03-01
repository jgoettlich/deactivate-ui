import { Component, OnInit, Input } from '@angular/core';
import { DeactivateService } from '../services/deactivate.service';
import { StatusUpdate } from '../model/StatusUpdate';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent implements OnInit {

  @Input() isEditable: boolean = false;
  @Input() status: number = 0;
  @Input() dsn: number = null;
  @Input() requestId: string = null;

  constructor(private deactivateService: DeactivateService) { }

  ngOnInit() {
  }

  setStatus(status: number) {
    this.status = status;
  }

  updateStatus() {
    let update : StatusUpdate = {
      requestId: this.requestId,
      dsn: this.dsn,
      status: this.status
    }; 
    this.deactivateService.updateRequestStatus(update).subscribe(() =>{});
  }

}
