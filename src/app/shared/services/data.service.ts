import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(prod: Product[]) {
    this.messageSource.next(prod);
  }
}
