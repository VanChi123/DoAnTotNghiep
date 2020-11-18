import { Injectable } from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {Product} from '../models/product.model';
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  changeMessage(prod: Product[]) {
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

}
