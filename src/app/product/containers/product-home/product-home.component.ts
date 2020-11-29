import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {PageMetaModel} from '../../../shared/models/pageMeta.model';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  pageMeta: PageMetaModel;
  dataFull: any;

  constructor(private productService: ProductService,
              ) { }

  ngOnInit(): void {
    this.pageMeta = {}; // phải khởi tạo như này ko nếu ko set page size ,với page number sẽ undefine
    // (và class phải cho có thể null mấy thằng thuộc tính này : pageSize?:number)
    this.pageMeta.pageSize = 6;
    this.pageMeta.pageNumber = 0;
    this.productService.getProducts(this.pageMeta).subscribe(response =>
      {
        if (response){
          this.dataFull = response.data;
        }
      });
  }

  onChangeTab(t: any){
    console.log('xyz' + t.selectedIndex);
  }

  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  // click bất kì sự kiện nào của paginator đều thay có event trả ra hết các thông số
  onChangePage(event){
    console.log('e', event);
    this.pageMeta.pageSize = event.pageSize;
    this.pageMeta.pageNumber = event.pageIndex;
    this.productService.getProducts(this.pageMeta).subscribe(response =>
    {
      if (response){
        this.dataFull = response.data;
      }
    });
  }

  // cho phép chọn số lượng phần từ trên 1 trang
  numberOfProductSearch(): any[]{
    const numberResult = [];
    for (let i = 1; i <= this.dataFull.totalElements; i++){
      numberResult.push(i);
    }
    return numberResult;
  }

}
