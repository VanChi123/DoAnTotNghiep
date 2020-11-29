import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DataService} from '../../../shared/services/data.service';
import {Product} from '../../../shared/models/product.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagementService} from '../../../admin-manage/services/user-management.service';
import {ProductService} from '../../services/product.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  listProductInCart: any[];

  user: any;
  formThanhToan: FormGroup;

  // @ViewChildren('thanhTien') thanhTien: QueryList<ElementRef>;
  // // định dùng để tính tổng giá tiền theo ViewChildren nhưng ko đc vì nó phức tạp đoạn text chứa kí tự vnd và , và 1 số lỗi khác
  // ngAfterViewInit() {
  //   console.log('tt : ', this.thanhTien);
  //   this.thanhTien.forEach(e => {
  //     // this.totalMoney += Number((e.nativeElement.innerText.substring(1, e.nativeElement.innerText.length)).replace(',', ''));
  //  });
  //
  // }

  constructor(private data: DataService,
              private formBuilder: FormBuilder,
              private userManagementService: UserManagementService,
              private productService: ProductService,
              private toastrService: ToastrService,
              private router: Router,
  ) {
    // lấy danh sách sản phẩm trong giỏ hàng
    // this.data.currentMessage.subscribe(listProduct => {
    //   debugger
    //   if (listProduct) {
    //     this.listProductInCart = listProduct;
    //   }
    // });
    this.listProductInCart = JSON.parse(localStorage.getItem('cart'));
    if (!this.listProductInCart){
      this.listProductInCart = [];
    }

    this.formThanhToan = this.formBuilder.group({
      tenKhachHang: ['', Validators.compose([Validators.required])],
      soDienThoai: ['', Validators.compose([Validators.required])],
      gioiTinh: ['', Validators.compose([Validators.required])],
      diaChi: ['', Validators.compose([Validators.required])],
      htgh: ['', Validators.compose([Validators.required])], // hình thwucs giao hàng : a/ b
      giamGiaHoaDon: ['0']
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user) {
      this.userManagementService.getUser({typeAccount: 'customer', userName: this.user.tenDangNhap}).subscribe(e => {
          this.formThanhToan.patchValue(e.data);
        }
      );
    }

  }

  removeAProduct(maSanPham: string) {
    // tìm đến sản phẩm có mã đó và check xem số lượng của nó, nếu số lượng =1 thì filter (xóa khỏi ) ngược lại giảm sl
    this.listProductInCart.forEach(e => {
      if (e.maSanPham === maSanPham) {
        // if (e.soLuong === 1){
        //   // phải gán lại mới được
        //   this.listProductInCart = this.listProductInCart.filter( value => value.MaSanPham !== maSanPham);
        // }else {
        // nếu mà số lượng giảm = 0 rồi thì thôi;
        const quantity = e.soLuong - 1;
        if (quantity === -1) {
          // ở đây không làm gì cả nữa
          return;
        } else {
          e.soLuong -= 1;
          return;
        }

        // }
      }
    });
    // *: gán lại vào data chung
    // this.data.changeMessage(this.listProductInCart);
    localStorage.setItem('cart', JSON.stringify(this.listProductInCart));
  }

  removeAllProduct(maSanPham: string) {
    this.listProductInCart = this.listProductInCart.filter(value => value.maSanPham !== maSanPham);

    // *: gán lại vào data chung
    // this.data.changeMessage(this.listProductInCart);
    localStorage.setItem('cart', JSON.stringify(this.listProductInCart));
  }

  // thêm số lượng sản phẩm ( nút + số lượng )
  addAProduct(maSanPham: string) {
    this.listProductInCart.forEach(e => {
      if (e.maSanPham === maSanPham) {
        e.soLuong += 1;
        return;
      }
    });

    // lại đổ lại vào trong dữ liệu chung :
    // this.data.changeMessage(this.listProductInCart);
    localStorage.setItem('cart', JSON.stringify(this.listProductInCart));
  }

  // tính tổng tiền phải thanh toán , cộng từng sản phẩm vào
  total(): number {
    // khó để binding với method nếu sử dụng ViewChirlden nhé, nên map theo biến thì tốt hơn
    // ở đây dùng bên ts nên map theo hàm luôn vẫn ok

    let total = 0;
    this.listProductInCart.forEach(e => {
      total += ((e.gia - (e.giamGia * e.gia * 0.01)) * e.soLuong);
    });

    return total;
  }

  // giảm giá hóa đơn: trả về phần trăm giảm giá cho hóa đơn có trị giá đạt định mức tương ứng
  giamGiaHoaDon() {
    if (this.total() > 10000000) {
      return 0.15;
    } else if (this.total() > 5000000) {
      return 0.1;
    } else if (this.total() > 1000000) {
      return 0.05;
    } else {
      return 0;
    }
  }


  // kiểm tra xem số lượng sản phẩm của một mã ( các sản phẩm đều chắc chắn có rồi): nếu 0 còn thì nút - sẽ bị disable
  checkQuantityInCart(maSP: string): number {
    for (let i = 0; i < this.listProductInCart.length; i++) {
      if (this.listProductInCart[i].maSanPham === maSP) {
        return this.listProductInCart[i].soLuong;
      }
    }
  }

  // đặt hàng click
  onCreateOrder() {
    const gghd = this.giamGiaHoaDon() * 100;
    let idgghd;
    if (gghd === 5) {
      idgghd = 5;
    } else if (gghd === 10) {
      idgghd = 3;
    } else if (gghd === 15) {
      idgghd = 2;
    } else if (gghd === 20) {
      idgghd = 1;
    } else {
      idgghd = 4;
    }

    this.productService.addOrder({
      tongTien: this.total(),
      tongTienPhaiTra: this.total() - this.total() * this.giamGiaHoaDon(),
      tienGiamGia: this.total() * gghd,
      trangThai: 0,
      idGiamGia: idgghd,
      tenDangNhap: JSON.parse(localStorage.getItem('user')).tenDangNhap
    }).subscribe(e => {
      if (e.success) {
        this.toastrService.success('Thành công', '');
        this.router.navigate(['/product/payment', e.data.id]);
      }
    });
  }

  // hiển thị ảnh
  displayImg(imgName: string): string {
    return Number(imgName.replace(' ', '')).toString();
  }
}
