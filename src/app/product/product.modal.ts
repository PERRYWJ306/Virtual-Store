
import { FormBase } from 'src/app/shared/form.base';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, IProduct } from '../models/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-product',
  templateUrl: './product.modal.html',
  styleUrls: ['./product.modal.css']
})
export class ProductModalComponent extends FormBase  implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl('', [Validators.required]),
    exempt: new FormControl(''),
    imported: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<ProductModalComponent>, @Inject(MAT_DIALOG_DATA) public data: IProduct) {
    super();

    if (data !== null) {
      this.form.get('name').setValue(data.name);
      this.form.get('price').setValue(data.price);
      this.form.get('exempt').setValue(data.exempt);
      this.form.get('imported').setValue(data.imported);
    }
  }

  ngOnInit() {
  }

  onSave() {
    const prd = new Product();

    prd.id = this.data.id;
    prd.name = this.form.get('name').value;
    prd.price = this.form.get('price').value;
    prd.exempt = this.form.get('exempt').value;
    prd.imported = this.form.get('imported').value;

    prd.exempt = prd.exempt === undefined ? false : prd.exempt;
    prd.imported = prd.imported === undefined ? false : prd.imported;

    this.dialogRef.close(prd);
  }

  onSubmit() {
    this.onSave();
  }
}
