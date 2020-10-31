import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagementService} from '../../services/user-management.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss']
})
export class LoginHomeComponent implements OnInit {

  formLogin: FormGroup;
  unamePattern = '[a-zA-z0-9_-]*$';

  // kiểm tra xem có lưu trữ mật khẩu không
  userStore: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userManagementService: UserManagementService,
              private toastrService: ToastrService) {
    this.formLogin = fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      memoryPass: ['']
    });
    this.formLogin.patchValue({memoryPass: false});
  }

  ngOnInit(): void {

    // nếu có mật khẩu ghi nhớ thì truyền vào form và giá trị ghi nhớ true
    this.userStore = JSON.parse(localStorage.getItem('memoryUser'));

    if (this.userStore){
      this.formLogin.patchValue({userName: this.userStore.tenDangNhap, password : atob(this.userStore.matKhau), memoryPass : true});
    }
  }

  onLogin() {
    const {value, valid} = this.formLogin;
    if (valid) {
      debugger
      this.userManagementService.login({userName: value.userName, password: btoa(value.password)}).subscribe(e => {
        debugger
        if (e && e.success){
          const userStore: any = {};
          userStore.tenDangNhap = e.data.tenDangNhap;
          userStore.matKhau = e.data.matKhau;
          // userStore.memoryPass = this.formLogin.value.memoryPass;
          localStorage.setItem('user', JSON.stringify(userStore));

          // nếu tích ô nhớ mật khẩu thì lưu trữ nếu không thì xóa cái đã tồn tại nếu có
          if (this.formLogin.value.memoryPass){
            localStorage.setItem('memoryUser', JSON.stringify(userStore));
          }else {
            localStorage.removeItem('memoryUser');
          }

          console.log('dt', e);
          this.toastrService.success('Đăng Nhập Thành Công', '');
          this.router.navigate(['/product/']);
        }else {
          this.toastrService.warning('Tên đăng nhập hoặc mật khẩu không đúng', '');
        }
      });
    } else {
      this.toastrService.warning('Thông tin nhập không hợp lệ', 'Thất bại');
    }
  }

}
