import { Component, OnInit, Input } from '@angular/core';
import { DeactivateService } from '../services/deactivate.service';
import { ReasonUpdate } from '../model/ReasonUpdate';

@Component({
  selector: 'app-request-reason',
  templateUrl: './request-reason.component.html',
  styleUrls: ['./request-reason.component.css']
})
export class RequestReasonComponent implements OnInit {

  @Input() isEditable: boolean = false;
  @Input() reason: number = 0;
  @Input() dsn: number = null;
  @Input() requestId: string = null;
  @Input() cid: number = null;

  constructor(private deactivateService: DeactivateService) { }

  ngOnInit() {
  }

  setReason(reason: number) {
    this.reason = reason;
  }

  updateReason() {
    let update : ReasonUpdate = {
      requestId: this.requestId,
      dsn: this.dsn,
      reason: this.reason,
      cid : this.cid
    }; 
    this.deactivateService.updateRequestReason(update).subscribe(() =>{});
  }

}
