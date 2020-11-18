import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserManagementService} from "../../../admin-manage/services/user-management.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {OtpSendComponent} from "../../../shared/components";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.scss']
})
export class RegisterHomeComponent implements OnInit {

  formRegister: FormGroup;
  unamePattern = '[a-zA-z0-9_-]*$';
  private unsubscribe$ = new Subject<void>(); // hủy subcribe

  constructor(private fb: FormBuilder,
              private router: Router,
              private userManagementService: UserManagementService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {
    this.formRegister = fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      rePassword: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(this.unamePattern)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])]
    });
  }

  ngOnInit(): void {
  }

  onRegister() {
    const {value, valid} = this.formRegister;
    if (valid) {
      this.userManagementService.register({username: value.userName, email: value.email}).subscribe(e => {
        debugger
        if (e && e.data && e.data.success){

          console.log('key', atob(e.data.key));

          const dialogRef = this.dialog.open(
            OtpSendComponent,
            {width: '60vw', minWidth: '300px', height: '450', data: { form: this.formRegister.value, key: atob(e.data.key)}}
          );

          dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
            // this.isBeingViewed = false;
            debugger
            if (result.result === true){
              const data: any =  {};
              data.typeAccount = 'customer';
              data.userName = value.userName;
              data.password = btoa(value.password);
              data.email = value.email;
              this.userManagementService.registerAdd(data).subscribe(resul => {
                if (resul) {
                  this.toastrService.success('Đăng kí tài khoản thành công', '');
                  this.router.navigate(['/user/login']);
                }
              });
            }
          });

        }else {
          this.toastrService.warning('Không thể đăng kí vì lý do gì đó', '');
        }
      });
    } else {
      this.toastrService.warning('Thông tin nhập không hợp lệ', 'Thất bại');
    }

  }

}
