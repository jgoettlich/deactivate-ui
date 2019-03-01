import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deactivate-form',
  templateUrl: './deactivate-form.component.html',
  styleUrls: ['./deactivate-form.component.css']
})
export class DeactivateFormComponent implements OnInit {

  requestNotes: string  = "";
  requestedDate: Date   = null;
  contactEmail: string  = null;

  constructor() { }

  ngOnInit() {
  }

}
