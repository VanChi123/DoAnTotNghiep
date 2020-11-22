import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-payment-dialog',
  templateUrl: './product-payment-dialog.component.html',
  styleUrls: ['./product-payment-dialog.component.scss']
})
export class ProductPaymentDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ProductPaymentDialogComponent>
  ) { }

  soTaiKhoan: any;
  soTien: any;
  key: any;

  ngOnInit(): void {

    if (this.data){
      debugger
    }
  }

}
