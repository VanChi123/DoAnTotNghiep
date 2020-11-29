import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Product} from '../../models/product.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  // số lượng sản phẩm trong giỏ hàng
  prods: any[];

  // dữ liệu tìm kiếm
  valueSearch: any;
  @Output() dataSearch = new EventEmitter();

  // hiển thị ngày giờ hiện tại
  now: any;

  // kiểm tra xem có lưu trữ mật khẩu không
  userStore: any;

  constructor(private data: DataService,
              private router: Router,
              private toastrService: ToastrService,
              public translate: TranslateService
              ) {

    // lấy danh sách sản phẩm trong giỏ hàng
    // this.data.currentMessage.subscribe(listProduct => {
    //   debugger
    //   if (listProduct){
    //     this.prods = listProduct;
    //   }
    // });


    // this.data.currentMessage.subscribe(messa => {
    //   debugger
    //   if (messa){
    //     this.prods = messa;
    //   }
    //
    // });

    // setInterval(() => {
    //   this.now = new Date();
    // }, 1);
  }

  ngOnInit(): void {

    // this.data.currentMessage.subscribe(messa => {
    //   this.prods = messa;
    // });
  }

  checkCart(){
    console.log('cart have: ', this.prods);
  }

  soLuongGioHang(){
    this.prods = JSON.parse(localStorage.getItem('cart'));
    if (!this.prods){
      return 0;
    }else {
      return this.prods.length;
    }
  }

  logOut(){
    localStorage.removeItem('user');

    this.toastrService.success('Đăng xuất thành công', '');
    this.router.navigate(['']);
  }

  changePass(){
    this.router.navigate(['/user/change-password']);
  }

  // xem thông tin cá nhân
  informationShow(){
    this.router.navigate(['/user/info']);
  }

  logIn(){
    this.router.navigate(['/user/login']);
  }

  favoriteProduct(){
    this.router.navigate(['/product/favorite']);
  }

  register(){
    this.router.navigate(['/user/register']);
  }

  checkUser(){
    if (localStorage.getItem('user')){
      return true;
    }else {
      return  false;
    }
  }

  getNameUser(){
    return JSON.parse(localStorage.getItem('user')).tenDangNhap.charAt(0).toUpperCase();
  }

  onSearch(){
    this.dataSearch.emit(this.valueSearch);
  }

}
