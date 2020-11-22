import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../models/product.model';
import {DataService} from '../../services/data.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges, OnDestroy {

  private unsubcribe$ = new Subject<void>();

  @Input() product: any;

  prods: any[];
  // user: any; // lấy thông tin user để hiển thị snar phẩm yêu thích bởi tài khoản này hay không

  constructor(private data: DataService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private dataService: DataService,
              private toastrService: ToastrService
              ) {
    this.data.currentMessage.subscribe(messa => {
      this.prods = messa;
    });
  }

  ngOnInit(): void {

    this.data.currentMessage.subscribe(messa => {
      this.prods = messa;
    });

    // this.user = JSON.parse(localStorage.getItem('user')); // lấy ko có thì sẽ trả về null
    // console.log('this, user', this.user);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  // thêm 1 sản phẩm vào giỏ hàng
  addCart(product: Product) {
    debugger
    // nếu giỏ hàng không có sp nào thì thêm luôn
    if (this.prods.length === 0 ){
      this.prods.push(product);
    }else {
      // nếu giỏ hàng có rồi thì kiểm tra xem mã sản phẩm tồn tại chưa, nếu tồn tại rồi thì chỉ tăng số lượng
      const position = this.checkExistInCart(product.maSanPham);
      if (position !== -1){ // nếu tìm thấy vị trí tồn tại
        this.prods[position].soLuong += 1;
      }else {
        this.prods.push(product);
      }
    }
    // gán lại giỏ hàng
    this.data.changeMessage(this.prods);
  }

  // kiểm tra xem sản phẩm tôn tại trong giỏ hàng chưa, nếu tồn tại thì trả về vị trí , còn lại thì trả về 0;
  checkExistInCart(maSP: string): number{
    debugger
    for (let i = 0; i  < this.prods.length; i++){
      if (this.prods[i].maSanPham === maSP){
        return i;
      }
    }
    return -1;
  }
  // // hiển thị ảnh
  // displayImg(imgName: string): string{
  //   return Number(imgName.replace(' ', '')).toString();
  // }

  // phần trăm giảm giá
  displayValueOff(price: number): string{
    return '-' + price + '%';
  }

  // giá sau giảm giá
  displayValueAfterOff(price: number, portion: number): number{
    return price - price * portion * 0.01;
  }

  // hiển thị ảnh
  handleGetAvatar(avatar: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${avatar}`);
  }

  // khởi tạo mảng chứa số ông sao
  initStar(count: number): any[]{
    const numberArr = [];
    for (let i = 0; i < count ; i++){
      numberArr.push(i);
    }
    return numberArr;
  }

  // click vào nút yêu thích
  onFavorite(choose: boolean){
    const user = JSON.parse(localStorage.getItem('user'));

    if ( user){
      console.log('user', user.tenDangNhap, ' và ', this.product.id);
      this.dataService.favoriteProduct({tenDangNhap: user.tenDangNhap, idSanPham: this.product.id})
        .pipe(takeUntil(this.unsubcribe$)).subscribe(e => {
          if (e.success){
            this.toastrService.success('Thêm sản phẩm vào yêu thích', 'Thành công');
          }
          if (!e.success){
            this.toastrService.warning('Thêm sản phẩm vào yêu thích', 'Thất bại');
          }
      });
    }else {
      // nếu chưa đăng nhập thì chuyển ssang trang đăng nhập
      this.router.navigate(['/user/login']);
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}



