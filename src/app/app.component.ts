import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, PRODUCT_DATA } from './models/product';
import { ReceiptItem } from './models/receipt-item';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from './product/product.modal';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'virtual-store';
  products: Observable<Product[]>;
  receipt: Observable<ReceiptItem[]>;

  singleRowSelected = false;
  taxes = 0;
  duty = 0;
  total = 0;

  productColumns: string[] = ['select', 'name', 'price', 'exempt', 'imported'];
  receiptColumns: string[] = ['product', 'price', 'salestax', 'importduty', 'cost'];
  footerColumns: string[] = ['cost'];

  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(true, []);
  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openProductModal(product) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '550px',
      height: '550px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The product dialog was closed.');
      if (result instanceof Product) {
        if (result.id !== undefined && result.id !== 0) {
          this.updateProduct(result);
        } else {
          this.createProduct(result);
        }
      }
    });
  }

  chr4() {
    return Math.random().toString(16).slice(-4);
  }

  uniqueID() {
    return parseInt(this.chr4() + this.chr4() + this.chr4(), 10);
  }

  updateProduct(product) {
    const products = this.dataSource.data.filter(d => d.id !== product.id);
    products.push(product);
    this.dataSource = new MatTableDataSource<Product>(products);
  }

  createProduct(product) {
    const products = this.dataSource.data;
    product.id = this.uniqueID();
    products.push(product);
    this.dataSource = new MatTableDataSource<Product>(products);
  }

  openConfirmationModal(title, message) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: { title, message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The confirmation dialog was closed');
      if (result === true) {
        const selected = this.selection.selected;

        if (selected.length > 0) {
          this.deleteProduct(selected[0]);
        }
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkClicked(event) {
    event.stopPropagation();
  }

  checkChanged(row) {
    this.selection.toggle(row);
    const numSelected = this.selection.selected.length;
    this.singleRowSelected = numSelected === 1;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addItem() {
    const product = new Product();

    this.openProductModal(product);
  }

  editItem() {
    const selected = this.selection.selected;

    if (selected.length > 0) {
      this.openProductModal(selected[0]);
    }
  }

  deleteProduct(product) {
    const products = this.dataSource.data.filter(d => d.id !== product.id);
    this.dataSource = new MatTableDataSource<Product>(products);

    this.selection = new SelectionModel<Product>(true, []);
    const numSelected = this.selection.selected.length;
    this.singleRowSelected = numSelected === 1;
  }

  removeItem() {
    const selected = this.selection.selected;

    if (selected.length > 0) {
        const message = 'Are your sure you want to product ' + selected[0].name;

        this.openConfirmationModal('Delete Product', message);
    }
  }

  testItems() {
    this.dataSource = new MatTableDataSource<Product>(PRODUCT_DATA);
  }

  clearItems() {
    this.dataSource = new MatTableDataSource<Product>();
    this.receipt = null;
    this.total = 0;
    this.taxes = 0;
    this.duty = 0;
  }

  purchaseItems() {
    const prods = this.dataSource.data;

    this.makePurchase(prods);
  }

  makePurchase(prods: Product[]) {
    const items = new Array<ReceiptItem>();
    this.total = 0;
    this.taxes = 0;
    this.duty = 0;

    prods.forEach(p => {
      const i = new ReceiptItem();

      i.product = p;

      i.salestax = !p.exempt ? p.price * environment.sales_tax_rate : 0;
      i.importduty = p.imported ? p.price * environment.import_duty_rate : 0;
      i.cost = Number(p.price);
      i.cost += i.salestax;
      i.cost += i.importduty;

      this.taxes += i.importduty;
      this.duty += i.importduty;
      this.total += i.cost;

      items.push(i);
    });

    this.receipt = of(items);

    return this.receipt;
  }
}
