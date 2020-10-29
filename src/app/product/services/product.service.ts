import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PageMetaModel} from '../../shared/models/pageMeta.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(pageMeta: PageMetaModel) {
    const payload = pageMeta;
    debugger
    return this.httpClient
      .post<any>(`http://localhost:8081/product/`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
  getProductss(body) {
    const payload = {
      body
    };
    debugger
    return this.httpClient
      .get<any>(`http://localhost:3000/products`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  getProductByMaSanPham$(maSanpham: string) {
    // c1: post data dạng form data
    // const formData = new FormData();
    // formData.append('idSanPham', maSanpham);
    // return this.httpClient
    //   .post<any>(`http://localhost:8081/product/`, formData)
    //   .pipe(catchError((httpError: any) => {
    //     return throwError(httpError);
    //   }));

    // c2: sử dụng query param trên dường dẫn
    // const params = new HttpParams().append('idSanPham', maSanpham);
    // return this.httpClient
    //   .get<any>(`http://localhost:8081/product/view`, {params: params})
    //   .pipe(catchError((httpError: any) => {
    //     return throwError(httpError);
    //   }));

    // c3 :sử dụng path variable
    return this.httpClient
      .get<any>(`http://localhost:8081/product/view/${maSanpham}`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  // lấy ảnh sản phẩm theo id
  getImgById(body) {
    const params = new HttpParams().append('idProduct', body);
    return this.httpClient
      .get<any>(`http://localhost:8081/images/`, {params: params})
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
}
