import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-view-detail',
  templateUrl: './product-view-detail.component.html',
  styleUrls: ['./product-view-detail.component.scss']
})
export class ProductViewDetailComponent implements OnInit {

  data: any;
  images: any;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    // lấy id trên đường dẫn
    this.activatedRoute
      .params
      .subscribe(params => {
        const maSanPham = params.maSanPham;
        const idSanPham = params.id;

        // lấy thông tin sản phẩm
        this.productService.getProductByMaSanPham$(maSanPham).subscribe(e => {
          debugger
          if (e){
            if (e.success){
              this.data = e.data;
            }else {
              this.toastrService.warning('Không tồn tại sản phẩm', '', {positionClass: 'toast-top-center', timeOut: 2000});
            }
          }
        });

        // lấy ảnh sản phẩm
        this.productService.getImgById(idSanPham).subscribe(e => {
          debugger
          if (e){
            if (e.success){
              this.images = e.data;
            }else {
              this.toastrService.warning('Không tồn ảnh nào', '', {positionClass: 'toast-top-center', timeOut: 2000});
            }
          }

        });
      });
  }

  // hiển thị ảnh nếu tên ảnh là 1 số và nhiều dấu cách phía sau
  displayImg(imgName: string): string{
    return Number(imgName.replace(' ', '')).toString();
  }

}
