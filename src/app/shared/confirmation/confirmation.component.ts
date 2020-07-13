import { Component, OnInit, Inject } from '@angular/core';
import { FormBase } from '../form.base';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent extends FormBase implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    super();

  }

  ngOnInit() {
  }

}
