import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageMetaModel} from '../../../shared/models/pageMeta.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {DataService} from '../../../shared/services';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {UserManagementService} from '../../../admin-manage/services/user-management.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageMeta: PageMetaModel;
  dataFull: any;
  data: any[];
  // productss$: Observable<any>;

  searchForm: FormGroup;
  models: any[];
  categories: any[];
  private unsubcribe$ = new Subject<void>();
  searchInfo: any = {};

  showSearch = false;
  valueFilter: any;

  constructor(private userManagementService: UserManagementService,
              private fb: FormBuilder,
              private dataService: DataService,
              private translateService: TranslateService

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
    this.getCategories();
  }

  ngOnInit(): void {

    this.pageMeta = {}; // phải khởi tạo như này ko nếu ko set page size ,với page number sẽ undefine
    // (và class phải cho có thể null mấy thằng thuộc tính này : pageSize?:number)
    this.pageMeta.pageSize = 6;
    this.pageMeta.pageNumber = 0;

    this.searchInfo['pageSize'] = this.pageMeta.pageSize;
    this.searchInfo['pageNumber'] = this.pageMeta.pageNumber;
    this.searchInfo['codeProduct'] = '';
    this.searchInfo['nameProduct'] = '';
    this.searchInfo['loaiSanPham'] = [];
    this.searchInfo['thuongHieu'] = [];
    this.searchInfo['priceLower'] = '';
    this.searchInfo['priceUpper'] = '';
    // this.currentPage = Number(this.searchInfo['pageNumber']) + 1;

    this.userManagementService.getAllProduct(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      debugger
      if (value && value.data) {
        this.dataFull = value.data;
        this.data = value.data.content;
        // this.pagination = value.data;
      }
    });

    // this.userManagementService.getAllProduct(this.pageMeta).subscribe(response =>
    // {
    //   if (response){
    //     this.dataFull = response.data;
    //   }
    // });

    // this.productss$ = this.productService.getProductss('a');
  }

  // click bất kì sự kiện nào của paginator đều thay có event trả ra hết các thông số
  onChangePage(event){
    console.log('e', event);
    this.pageMeta.pageSize = event.pageSize;
    this.pageMeta.pageNumber = event.pageIndex;

    this.searchInfo['pageSize'] = this.pageMeta.pageSize;
    this.searchInfo['pageNumber'] = this.pageMeta.pageNumber;

    this.userManagementService.getAllProduct(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(response =>
    {
      if (response){
        this.dataFull = response.data;
        this.data = response.data.content;
      }
    });
  }

  // cho phép chọn số lượng phần từ trên 1 trang
  numberOfProductSearch(): any[]{
    const numberResult = [];
    for (let i = 1; i <= this.dataFull.totalElements; i++){
      numberResult.push(i);
    }
    return numberResult;
  }

  // tìm kiếm ở header truyền vào
  onSearch(value: any){
    // debugger
    this.pageMeta = {}; // phải khởi tạo như này ko nếu ko set page size ,với page number sẽ undefine
    // (và class phải cho có thể null mấy thằng thuộc tính này : pageSize?:number)
    this.pageMeta.pageSize = 6;
    this.pageMeta.pageNumber = 0;

    // this.dataFull = null;
    //
    // this.productService.getProducts(this.pageMeta).subscribe(response =>
    // {
    //   if (response){
    //     this.dataFull = response.data;
    //   }
    // });

    // this.searchInfo['pageSize'] = this.searchForm.value.pageSize;
    // this.searchInfo['pageNumber'] = '0';
    this.searchInfo['pageSize'] = this.pageMeta.pageSize;
    this.searchInfo['pageNumber'] = this.pageMeta.pageNumber;
    this.searchInfo['codeProduct'] = this.searchForm.value.codeProduct;
    this.searchInfo['nameProduct'] = this.searchForm.value.nameProduct;
    this.searchInfo['loaiSanPham'] = this.searchForm.value.loaiSanPham === '' ? [] : this.searchForm.value.loaiSanPham;
    this.searchInfo['thuongHieu'] = this.searchForm.value.thuongHieu  === '' ? [] : this.searchForm.value.thuongHieu;
    this.searchInfo['priceLower'] = this.searchForm.value.priceLower;
    this.searchInfo['priceUpper'] = this.searchForm.value.priceUpper;

    // this.currentPage = Number(this.searchInfo['pageNumber']) + 1;

    this.userManagementService.getAllProduct(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value1 => {
      debugger
      if (value1 && value1.data) {
        this.dataFull = value1.data;
        this.data = value1.data.content;
        // this.pagination = value.data;
      }
    });
  }

  // lấy danh mục để tìm kiếm
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

  onChooseFilter(){
    debugger
    if (this.valueFilter === 'asc'){
      this.data = _.orderBy(this.data, ['gia'], ['asc']); // sau khi sắp xếp nó sẽ tạo mới chứ ko sắp xếp data nguồn
    }else {
      this.data = _.orderBy(this.data, ['gia'], ['desc']);
    }
  }


}
