import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {UserManagementService} from "../../services/user-management.service";
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../../../shared/services";
import {ProductService} from "../../../product/services/product.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {OrderPaymentComponent} from "..";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  private unsubcribe$ = new Subject<void>();

  listOrder: any[];

  constructor(private router: Router,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private translateService: TranslateService,
              private userManagementService: UserManagementService,
              private dialog: MatDialog,
              private dataService: DataService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllOrder({data: null}).pipe(takeUntil(this.unsubcribe$)).subscribe(e => {
      if (e){
        this.listOrder = e.data;
      }
    });
  }

  onEdit(x: any){
    // thanh toán hóa đơn

    this.productService.orderPayment({idNhanVien: 12,
              idHoaDon: 123,
              trangThai: 1,
              hinhThucThanhToan: 0,
              soTienDaTra: 13888384
    }).pipe(takeUntil(this.unsubcribe$)).subscribe(e => {
      if (e.success){
        this.toastrService.success('Thanh toán thành công', '');
      }
    });

    // mở dialog in hóa đơn
    const dialogRef = this.dialog.open(
      OrderPaymentComponent,
      {width: '60vw', minWidth: '300px', height: '550', data: {nhanVien: 100000},
        panelClass: 'custom-modalbox', disableClose: true}
    );

    dialogRef.afterClosed().pipe(takeUntil(this.unsubcribe$)).subscribe(result => {
      if (result.result === true) {
        debugger
        // this.productService.updateOrderPayment({
        //   id: this.id,
        //   hinhThucThanhToan: 1,
        //   soTienDaTra: result.soTienDaTra,
        //   trangThai: 1
        // });
        this.toastrService.success('Hoàn tất thanh toán', '');
      }
    });

  }

  onDelete(x: any){

  }

  private getI18nMsg(key: string, params?: any): string {
    let i18nMsg = '';
    this.translateService.get(key, params).pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
      if (res) {
        i18nMsg = res;
      }
    });
    return i18nMsg;
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

}
