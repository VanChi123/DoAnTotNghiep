import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-view-detail',
  templateUrl: './product-view-detail.component.html',
  styleUrls: ['./product-view-detail.component.scss']
})
export class ProductViewDetailComponent implements OnInit {

  data: any;
  images: any;
  binhLuans: any[];

  constructor(private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private productService: ProductService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    // lấy id trên đường dẫn
    this.activatedRoute
      .params
      .subscribe(params => {
        const maSanPham = params.maSanPham;
        const idSanPham = params.id;
        debugger

        // lấy thông tin sản phẩm
        this.productService.getAProduct(idSanPham).subscribe(e => {
          debugger
          if (e){
            if (e.success){
              this.data = e.data;
              this.binhLuans = e.data.binhLuans;
              this.orderBinhLuans('desc');
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
  // displayImg(imgName: string): string{
  //   return Number(imgName.replace(' ', '')).toString();
  // }

  // hiển thị ảnh
  handleGetAvatar(avatar: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${avatar}`);
  }

  // sắp xếp bình luận
  orderBinhLuans(type: string){
    this.binhLuans = _.orderBy(this.binhLuans, ['ngayGio'], [type]);
  }

  // chọn lựa chọn sắp xếp bình luận
  onClickRadio(e){
    // console.log('e', e);
    if (e === 'asc'){
      this.orderBinhLuans('asc');
    }else {
      this.orderBinhLuans('desc');
    }
  }

  // kiểm tra xem user có đăng nhập hay không để hiển thị nút gửi bình luận
  checkUser(){
    if (localStorage.getItem('user')){
      return true;
    }else {
      return  false;
    }
  }

  onSendComment(e){
    console.log('e', e);
  }

}
