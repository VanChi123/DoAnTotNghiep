import { Injectable } from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {Product} from '../models/product.model';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public messageSource = new BehaviorSubject([]);
  public currentMessage = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  changeMessage(prod: any[]) {
    debugger
    this.messageSource.next(prod);
  }

  // lấy danh sách thương hiệu
  getAllModels() {
    return this.httpClient
      .get<any>(`http://localhost:8081/model/`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // lấy danh sách loại sản phẩm
  getAllCategories() {
    return this.httpClient
      .get<any>(`http://localhost:8081/category/`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // yêu thích sản phẩm
  favoriteProduct(body: any) {
    const payload = body;

    return this.httpClient
      .post<any>(`http://localhost:8081/account/favorite`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // lấy danh sách khách hàng
  getAllCustomer() {
    return this.httpClient
      .get<any>(`http://localhost:8081/customer/`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // lấy danh sách sản phẩm
  getAllProducts() {
    return this.httpClient
      .get<any>(`http://localhost:8081/product/`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

}
