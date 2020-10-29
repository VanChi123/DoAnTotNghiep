import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  // đăng nhập
  login(data: any) {
    const payload = data;

    debugger
    return this.httpClient
      .post<any>(`http://localhost:8081/user/login`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // gửi mã otp
  register(data: any) {
    const payload = data;

    debugger
    return this.httpClient
      .post<any>(`http://localhost:8081/user/forgot-password`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // thêm mới tài khoản
  registerAdd(data: any) {
    const payload = data;

    debugger
    return this.httpClient
      .post<any>(`http://localhost:8081/account/add`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // lấy thoogn tin người dùng
  getUser(data: any) {
    const payload = data;

    debugger
    return this.httpClient
      .post<any>(`http://localhost:8081/customer/get`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // cập nhật thông tin cá nhân
  updateCustomerInformation(data: any) {
    const payload = data;

    debugger
    return this.httpClient
      .post<any>(`http://localhost:8081/customer/update`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
}
