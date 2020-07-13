import { Component, OnInit, Inject } from '@angular/core';
import { FormBase } from '../form.base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent extends FormBase implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

  }

  ngOnInit() {
  }

}
