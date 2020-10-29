import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../../shared/models/product.model';

@Component({
  selector: 'app-a-product-list',
  templateUrl: './a-product-list.component.html',
  styleUrls: ['./a-product-list.component.scss']
})
export class AProductListComponent implements OnInit, OnChanges {

  @Input() products: Product[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.products){
      this.products.forEach(e => {
        e.soLuong = 1;
        console.log('e', e);
      });
    }
  }

}
