import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Subject} from 'rxjs';
import {UserManagementService} from '../../../admin-manage/services/user-management.service';
import {DataService} from '../../../shared/services';
import {TranslateService} from '@ngx-translate/core';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-favorite',
  templateUrl: './product-favorite.component.html',
  styleUrls: ['./product-favorite.component.scss']
})
export class ProductFavoriteComponent implements OnInit, OnDestroy {
  data: any[];

  models: any[];
  categories: any[];

  private unsubcribe$ = new Subject<void>();

  valueFilter: any;

  user: any;

  constructor(private userManagementService: UserManagementService,
              private dataService: DataService,
              private translateService: TranslateService

  ) {
    this.getCategories();
  }

  ngOnInit(): void {

    this.userManagementService.getProductFavorite({tenDangNhap: JSON.parse(localStorage.getItem('user'))
        .tenDangNhap}).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      if (value && value.data) {
        this.data = value.data;
        this.data.forEach(ef => {
          ef.isFavorites = true;
        });
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
    if (this.valueFilter === 'asc'){
      this.data = _.orderBy(this.data, ['gia'], ['asc']); // sau khi sắp xếp nó sẽ tạo mới chứ ko sắp xếp data nguồn
    }else {
      this.data = _.orderBy(this.data, ['gia'], ['desc']);
    }
  }


}
