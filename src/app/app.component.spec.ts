import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product, PRODUCT_DATA } from './models/product';
import { Observable } from 'rxjs';
import { ReceiptItem } from './models/receipt-item';
import { doesNotReject } from 'assert';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        MatDialog
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'virtual-store'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('virtual-store');
  });

  it('should purchase items', done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const purchase = app.makePurchase(PRODUCT_DATA);
    purchase.subscribe(receipt => {
      expect(receipt[0].cost.toFixed(2)).toEqual('12.49');
      expect(receipt[1].cost.toFixed(2)).toEqual('16.49');
      expect(receipt[2].cost.toFixed(2)).toEqual('0.85');
      expect(receipt[3].cost.toFixed(2)).toEqual('10.50');
      expect(receipt[4].cost.toFixed(2)).toEqual('54.63');
      expect(receipt[5].cost.toFixed(2)).toEqual('9.75');
    });
    done();
  });
});
