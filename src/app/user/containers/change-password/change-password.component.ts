import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserManagementService} from '../../../admin-manage/services/user-management.service';
import {ToastrService} from 'ngx-toastr';
import {OtpSendComponent} from '../../../shared/components';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  formLogin: FormGroup;
  unamePattern = '[a-zA-z0-9_-]*$';

  // kiểm tra xem có lưu trữ mật khẩu không
  userStore: any;
  private unsubscribe$ = new Subject<void>(); // hủy subcribe

  constructor(private fb: FormBuilder,
              private router: Router,
              private userManagementService: UserManagementService,
              private dialog: MatDialog,
              private toastrService: ToastrService) {
    this.formLogin = fb.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern(this.unamePattern)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(15), , Validators.pattern(this.unamePattern)])],
      rePassword: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern(this.unamePattern)])],
    });
  }

  ngOnInit(): void {
    // lấy thông tin user trong local storage ra
    this.userStore = JSON.parse(localStorage.getItem('user'));
  }

  onLogin() {
    const {value, valid} = this.formLogin;
    if (valid) {

      // kiểm tra xem mật khẩu cũ có đúng ko
      if (btoa(value.oldPassword) !== this.userStore.password) {
        this.toastrService.warning('Mật khẩu cũ không đúng', 'Thất bại');
      }
      this.userManagementService.register({
        username: this.userStore.tenDangNhap,
        email: this.userStore.email
      }).subscribe(e => {

        // khởi  tạo gái trị để truyền vào
        const formData: any = {};
        formData.userName = this.userStore.tenDangNhap;
        formData.email = this.userStore.email;

        if (e && e.data && e.data.success) {
          const dialogRef = this.dialog.open(
            OtpSendComponent,
            {width: '60vw', minWidth: '300px', height: '450', data: {form: formData, key: atob(e.data.key)}}
          );

          dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
            // this.isBeingViewed = false;
            debugger;
            if (result.result === true) {
              console.log('xử lý thành công');
              const data: any =  {};
              data.newPassword = atob(value.password);
              data.userName = value.userName;

              this.userManagementService.changePassword(data).subscribe(resul => {
                if (resul && resul.success) {
                  this.toastrService.success('Đổi mật khẩu thành công', '');
                  this.router.navigate(['/user/login']);
                }
              });
            }
          });

        } else {
          this.toastrService.warning('Đổi mật khẩu thất bại', '');
        }
      });
    } else {
      this.toastrService.warning('Thông tin nhập không hợp lệ', 'Thất bại');
    }
  }

}
