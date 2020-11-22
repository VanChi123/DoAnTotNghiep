import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewImageComponent} from "../../../admin-manage/containers";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {ProductPaymentDialogComponent} from "../product-payment-dialog/product-payment-dialog.component";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-payment',
  templateUrl: './product-payment.component.html',
  styleUrls: ['./product-payment.component.scss']
})
export class ProductPaymentComponent implements OnInit, OnDestroy {
  private unsubcribe$ = new Subject<void>();
  private id: any;
  private tongTienPhaiTra: any;

  constructor(
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
    // lấy id trên đường dẫn
    this.activatedRoute
      .params.pipe(takeUntil(this.unsubcribe$))
      .subscribe(params => {
        this.id = params.id;
      });
  }

  ngOnInit(): void {

    this.productService.getOrder({
      id: this.id
    }).pipe(takeUntil(this.unsubcribe$)).subscribe(e => {
      if (e.success){
        debugger
        this.tongTienPhaiTra = e.data.tongTienPhaiTra;
      }else {
        this.toastrService.warning('Không lấy được order', '');
      }
    });
  }

  onPayAir(){
    const dialogRef = this.dialog.open(
      ProductPaymentDialogComponent,
      {width: '60vw', minWidth: '300px', height: '550', data: {key: 100000, minMoney: this.tongTienPhaiTra},
        panelClass: 'custom-modalbox', disableClose: true}
    );

    dialogRef.afterClosed().pipe(takeUntil(this.unsubcribe$)).subscribe(result => {
      if (result.result === true) {
        debugger
        this.productService.updateOrderPayment({
          id: this.id,
          hinhThucThanhToan: 1,
          soTienDaTra: result.soTienDaTra,
          trangThai: 1
        });
        this.toastrService.success('Thành công', 'Thanh toán');
      }
    });
  }

  ngOnDestroy(){
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

}
