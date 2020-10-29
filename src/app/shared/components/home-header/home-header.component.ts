import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Product} from '../../models/product.model';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  // số lượng sản phẩm trong giỏ hàng
  prods: Product[];

  // dữ liệu tìm kiếm
  valueSearch: any;
  @Output() dataSearch = new EventEmitter();

  constructor(private data: DataService,
              private router: Router,
              private toastrService: ToastrService
              ) {
    // this.data.currentMessage.subscribe(messa => {
    //   this.prods = messa;
    // });
  }

  ngOnInit(): void {

    this.data.currentMessage.subscribe(messa => {
      this.prods = messa;
    });
  }

  checkCart(){
    console.log('cart have: ', this.prods);
  }

  logOut(){
    localStorage.removeItem('user');
    this.toastrService.success('Đăng xuất thành công', '');
    this.router.navigate(['']);
  }

  // xem thông tin cá nhân
  informationShow(){
    this.router.navigate(['/user/info']);
  }

  logIn(){
    this.router.navigate(['/user/login']);
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

  onSearch(){
    this.dataSearch.emit(this.valueSearch);
  }

}
