import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DanhmucService {

  constructor(private httpClient: HttpClient) {
  }

  // thêm mới + update thương hiệu
  addModel(data: any) {
    const payload = data;

    return this.httpClient
      .post<any>(`http://localhost:8081/model/add`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // xóa thương hiệu
  deleteModel(data: any) {
    return this.httpClient
      .get<any>(`http://localhost:8081/model/delete/${data}`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // thêm mới + update loại sản phẩm
  addCategory(data: any) {
    const payload = data;

    return this.httpClient
      .post<any>(`http://localhost:8081/category/add`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // xóa loại sản phẩm
  deleteCategory(data: any) {
    return this.httpClient
      .get<any>(`http://localhost:8081/category/delete/` + data)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  ///////// module Star ////////////////////
  // lấy danh sách
  getAllStar() {
    return this.httpClient
      .get<any>(`http://localhost:8081/star/`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // thêm mới + update
  addStar(data: any) {
    const payload = data;

    return this.httpClient
      .post<any>(`http://localhost:8081/star/add`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // xóa loại sản phẩm
  deleteStar(id: any) {
    return this.httpClient
      .get<any>(`http://localhost:8081/star/delete/` + id)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
  ///////// end: module Star ////////////////////

  ///////// module Cart ////////////////////
  // lấy danh sách
  getAllCart(currentPage: any) {
    return this.httpClient
      .get<any>(`http://localhost:8081/cart/?pageNumber=${currentPage}`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // thêm mới + update
  addCart(data: any) {
    const payload = data;

    return this.httpClient
      .post<any>(`http://localhost:8081/cart/add`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // xóa
  deleteCart(id: any) {
    return this.httpClient
      .get<any>(`http://localhost:8081/cart/delete/` + id)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
  ///////// end: module Cart ////////////////////

  ///////// module Khách hàng////////////////////
  // lấy danh sách
  getAllCustomer(currentPage: any) {
    return this.httpClient
      .get<any>(`http://localhost:8081/customer/getAll?pageNumber=${currentPage}`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // thêm mới + update
  addCustomer(data: any) {
    const payload = data;

    return this.httpClient
      .post<any>(`http://localhost:8081/customer/add`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // xóa
  deleteCustomer(id: any) {
    return this.httpClient
      .get<any>(`http://localhost:8081/customer/delete/` + id)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  ///////// end: module Khách hàng ////////////////////

  // lấy tất cả tài khoản
  getAllAccount(){
    return this.httpClient
      .get<any>(`http://localhost:8081/account/`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

}
