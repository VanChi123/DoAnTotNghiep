import {Component, OnDestroy, OnInit, PipeTransform} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {take, takeUntil} from 'rxjs/operators';
import {UserManagementService} from '../../services/user-management.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountAddComponent} from '..';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {
  private unsubcribe$ = new Subject<void>();

  searchForm: FormGroup;
  // pageMeta: PageMeta;

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
  ) {
    this.searchForm = this.fb.group({
      tenDangNhap: ['', Validators.compose([ Validators.maxLength(50), Validators.pattern('[a-zA-z0-9_-]*$')])], // tên đăng nhập
      email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      pageSize: ['10', Validators.compose([Validators.min(1) ])], // số lượng tìm kiếm trên 1 trang
      quyenSuDung: [''], // status: ['WAITING'] // trạng thái yêu cầu
    });


  }

  ngOnInit() {
    this.searchInfo['pageSize'] = 10;
    this.searchInfo['pageNumber'] = '0';
    this.searchInfo['tenDangNhap'] = '';
    this.searchInfo['email'] = '';
    this.currentPage = Number(this.searchInfo['pageNumber']) + 1;

    this.userManagementService.getAllAccount(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      if (value && value.data) {
        this.data = value.data.content;
        this.pagination = value.data;
      }
    });

   // this.searchForm.patchValue({status: ['ALL', 'WAITING', 'APPROVED', 'REFUSE', 'CANCEL_APPROVED', 'EXPIRED']});

    // handle get categories
    // this.handleGetCategories();
  }

  handleGetViolateList() {
    // this.store.dispatch(loadViolateUserList({searchInfo: this.searchInfo}));
    // // Get violate user from store
    // this.violateUsers$ = this.store.pipe(select(selectViolateUsers));
    // // Get violate users pagination from store
    // this.violateUsersPagination$ = this.store.pipe(select(selectViolateUserPagination));
  }

  handleGetCategories() {
    // Dispatch get trạng thái
    // this.store.dispatch(loadCategories({body: {category: {categoryTypeCode: this.CATEGORY_TYPES.STATUS}}}));
    // // Dispatch get loại chứng thực
    // this.store.dispatch(loadCategories({body: {category: {categoryTypeCode: this.CATEGORY_TYPES.IDENTITY}}}));
    // // Dispatch quốc gia
    // this.store.dispatch(loadCategories({body: {category: {categoryTypeCode: this.CATEGORY_TYPES.COUNTRY}}}));
    // // BỘ BAN NGÀNH
    // this.store.dispatch(loadCategories({body: {category: {categoryTypeCode: this.CATEGORY_TYPES.MINISTRY}}}));
    // // HÌNH THỨC XỬ PHẠT
    // this.store.dispatch(loadCategories({body: {category: {categoryTypeCode: this.CATEGORY_TYPES.METHOD_CHARGE}}}));
    //
    // // VAI TRÒ VI PHẠM
    // this.store.dispatch(loadCategories({body: {category: {categoryTypeCode: this.CATEGORY_TYPES.ROLE_VIOLATE}}}));
    //
    // this.categories$ = this.store.pipe(select(selectCategories));
  }

  goToPage(event: any) {
    // event là 1 số :ban đầu nó sẽ bắn ra số 1 - page 0
    // ( mặc định nó bắn ra luôn sau khi load list xong nếu mà current page ko custom- khởi tạo riêng)
    const page: string = String(event - 1);
    this.searchInfo['pageNumber'] = page;

    this.userManagementService.getAllAccount(this.searchInfo).pipe(take(1)).subscribe(e => {
      if (e && e.data) {
        this.data = e.data.content;
        this.pagination = e.data;
      }
    });
  }

  onAdd(){
    const dialogRef = this.dialog.open(
      AccountAddComponent,
      {width: '60vw', minWidth: '300px', height: '550', data: {}, panelClass: 'custom-modalbox', disableClose: true}
    );

    dialogRef.afterClosed().pipe(takeUntil(this.unsubcribe$)).subscribe(result => {
      // this.isBeingViewed = false;
      debugger;
      if (result.result === false) {
        this.userManagementService.getAllAccount(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
          if (value && value.data) {
            this.data = value.data.content;
            this.pagination = value.data;
          }
        });
      }
    });
  }

  onEdit(event: any){
    debugger
    const dialogRef = this.dialog.open(
      AccountAddComponent,
      {width: '60vw', minWidth: '300px', height: '550', data: {event}, panelClass: 'custom-modalbox', disableClose: true}
    );

    dialogRef.afterClosed().pipe(takeUntil(this.unsubcribe$)).subscribe(result => {
      // this.isBeingViewed = false;
      debugger;
      if (result.result === false) {
        this.userManagementService.getAllAccount(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
          if (value && value.data) {
            this.data = value.data.content;
            this.pagination = value.data;
          }
        });
      }
    });
  }

  onDelete(event: any) {
    this.userManagementService.deleteAccountManyRoles({id : event}).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      if (value && value.data) {
        this.toastrService.success('Xóa tài khoản', 'Thành công');
        this.userManagementService.getAllAccount(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value1 => {
          if (value1 && value1.data) {
            this.data = value1.data.content;
            this.pagination = value1.data;
          }
        });
      }
      if (value && !value.data) {
        this.toastrService.warning('Xóa tài khoản', 'Thất bại');
      }
    });
  }

  onSearch() {
    this.searchInfo['pageSize'] = this.searchForm.value.pageSize;
    this.searchInfo['pageNumber'] = '0';
    this.searchInfo['tenDangNhap'] = this.searchForm.value.tenDangNhap;
    this.searchInfo['email'] = this.searchForm.value.email;

    this.currentPage = Number(this.searchInfo['pageNumber']) + 1;

    this.userManagementService.getAllAccount(this.searchInfo).pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
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
}
