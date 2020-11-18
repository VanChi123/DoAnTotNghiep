import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {UserManagementService} from "../../services/user-management.service";
import {MatDialog} from "@angular/material/dialog";
import {take, takeUntil} from "rxjs/operators";
import {DataService} from "../../../shared/services";
import {ProductService} from "../../../product/services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private unsubcribe$ = new Subject<void>();

  searchForm: FormGroup;
  // pageMeta: PageMeta;
  models: any[];
  categories: any[];

  searchInfo: any = {status: ''};
  data: any[];
  pagination: any;
  currentPage: number;

  constructor(private router: Router,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private translateService: TranslateService,
              private userManagementService: UserManagementService,
              private dialog: MatDialog,
              private dataService: DataService,
              private productService: ProductService
  ) {
    this.searchForm = this.fb.group({
      codeProduct: ['', Validators.compose([ Validators.maxLength(50), Validators.pattern('[a-zA-z0-9_-]*$')])], // tên đăng nhập
      nameProduct: ['', Validators.compose([Validators.maxLength(50)])],
      loaiSanPham: [''],
      thuongHieu: [''],
      priceLower: [''],
      priceUpper: [''],
      pageSize: ['10', Validators.compose([Validators.min(1) ])], // số lượng tìm kiếm trên 1 trang

    });


  }

  ngOnInit() {

    this.getCategories();

    this.searchInfo['pageSize'] = 10;
    this.searchInfo['pageNumber'] = '0';
    this.searchInfo['codeProduct'] = '';
    this.searchInfo['nameProduct'] = '';
    this.searchInfo['loaiSanPham'] = [];
    this.searchInfo['thuongHieu'] = [];
    this.searchInfo['priceLower'] = '';
    this.searchInfo['priceUpper'] = '';
    this.currentPage = Number(this.searchInfo['pageNumber']) + 1;

    this.userManagementService.getAllProduct(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      debugger
      if (value && value.data) {
        this.data = value.data.content;
        this.pagination = value.data;
      }
    });
  }

  goToPage(event: any) {
    // event là 1 số :ban đầu nó sẽ bắn ra số 1 - page 0
    // ( mặc định nó bắn ra luôn sau khi load list xong nếu mà current page ko custom- khởi tạo riêng)
    const page: string = String(event - 1);
    this.searchInfo['pageNumber'] = page;

    this.userManagementService.getAllProduct(this.searchInfo).pipe(take(1)).subscribe(e => {
      if (e && e.data) {
        this.data = e.data.content;
        this.pagination = e.data;
      }
    });
  }

  onAdd(){
    this.router.navigate(['/admin/product-add']);
  }

  onEdit(event: any){
    debugger
    this.router.navigate(['/admin/product-update', event.id]);
    // this.router.navigate(['/product/product-add']);
  }

  onDelete(event: any) {
    debugger
    this.productService.deleteAProduct(event).pipe(takeUntil(this.unsubcribe$)).subscribe(val => {
      if (val && val.success) {
        this.toastrService.success('Xóa sản phẩm', 'Thành công');
        this.userManagementService.getAllProduct(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
          if (value && value.data) {
            this.data = value.data.content;
            this.pagination = value.data;
          }
        });
      }
      if (val && !val.success) {
        this.toastrService.warning('Xóa sản phẩm', 'Thất bại');
      }
    });
  }

  onSearch() {

    this.searchInfo['pageSize'] = this.searchForm.value.pageSize;
    this.searchInfo['pageNumber'] = '0';
    this.searchInfo['codeProduct'] = this.searchForm.value.codeProduct;
    this.searchInfo['nameProduct'] = this.searchForm.value.nameProduct;
    this.searchInfo['loaiSanPham'] = this.searchForm.value.loaiSanPham === '' ? [] : this.searchForm.value.loaiSanPham;
    this.searchInfo['thuongHieu'] = this.searchForm.value.thuongHieu  === '' ? [] : this.searchForm.value.thuongHieu;
    this.searchInfo['priceLower'] = this.searchForm.value.priceLower;
    this.searchInfo['priceUpper'] = this.searchForm.value.priceUpper;

    this.currentPage = Number(this.searchInfo['pageNumber']) + 1;

    this.userManagementService.getAllProduct(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      if (value && value.data) {
        this.data = value.data.content;
        this.pagination = value.data;
      }
    });
  }

  // get erors form store
  showErrors(errors) {
    if (!errors) {
      return;
    }
    if (errors.responseEntityMessages && errors.responseEntityMessages.length > 0) {
      let errorMessage = '';
      errors.responseEntityMessages.forEach(er => {
        const errorCode = er.errorCode.replace('validation.constraints.', '');
        errorMessage = this.getI18nMsg('APP_FEATURE.REGISTER_MANAGEMENT.MESSAGE.KEY.' + er.key) + ': '
          + this.getI18nMsg('APP_FEATURE.REGISTER_MANAGEMENT.MESSAGE.ERROR_CODE.' + errorCode) + '<br>';
        if (er.params) {
          er.params.forEach(param => {
            errorMessage = errorMessage.replace(`{${param.key}}`, param.value);
          });
        }
      });
      this.toastrService.error(errorMessage, '');
      return;
    }
    this.toastrService.error(this.getI18nMsg('APP_FEATURE.REGISTER_MANAGEMENT.MESSAGE.ERROR_CODE.Undefined'), '');
  }

  // other different from all option click
  tosslePerOne(all, matType: any, formTypeLength: any, listTypeLength: any){
    if (matType.selected) {
      matType.deselect();
      return false;
    }
    console.log('ffff', formTypeLength, listTypeLength);
    if (formTypeLength === listTypeLength) {
      matType.select();
    }
  }

  // all option click
  toggleAllSelection(matType: any, formType: any, listType: any) {
    if (matType.selected) {
      // this.formSearch.controls.document
      //   .patchValue([0, ...this.documentKind.map(item => item.code)]);
      formType.patchValue([0, ...listType.map(item => item.id)]);
    } else {
      formType.patchValue([]);
    }
  }

  /**
   * Get message from i18n json
   * @param key fieldName
   * @returns message
   * @author NhuBV2
   */
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

  private getCategories() {
    // Dispatch get thương hiệu
    this.dataService.getAllModels().pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      if (value){
        this.models = value.data;
      }
    });

    // Dispatch get loại sản phẩm
    this.dataService.getAllCategories().pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      if (value){
        this.categories = value.data;
      }
    });
  }

}
