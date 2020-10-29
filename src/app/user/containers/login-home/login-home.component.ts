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

  constructor(private fb: FormBuilder,
              private router: Router,
              private userManagementService: UserManagementService,
              private toastrService: ToastrService) {
    this.formLogin = fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    const {value, valid} = this.formLogin;
    if (valid) {
      this.userManagementService.login({userName: value.userName, password: btoa(value.password)}).subscribe(e => {
        debugger
        if (e && e.success){
          localStorage.setItem('user', JSON.stringify(e.data));
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
