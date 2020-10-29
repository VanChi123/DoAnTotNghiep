import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DataService} from '../../../shared/services/data.service';
import {Product} from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, AfterViewInit {

  listProductInCart: Product[];

  @ViewChildren('thanhTien') thanhTien: QueryList<ElementRef>;
  // định dùng để tính tổng giá tiền theo ViewChildren nhưng ko đc vì nó phức tạp đoạn text chứa kí tự vnd và , và 1 số lỗi khác
  ngAfterViewInit() {
    console.log('tt : ', this.thanhTien);
    this.thanhTien.forEach(e => {
      // this.totalMoney += Number((e.nativeElement.innerText.substring(1, e.nativeElement.innerText.length)).replace(',', ''));
   });

  }

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(listProduct => {
      this.listProductInCart = listProduct;
    });
  }

  removeAProduct(maSanPham: string){
    // tìm đến sản phẩm có mã đó và check xem số lượng của nó, nếu số lượng =1 thì filter (xóa khỏi ) ngược lại giảm sl
    this.listProductInCart.forEach(e => {
      if (e.maSanPham === maSanPham){
        // if (e.soLuong === 1){
        //   // phải gán lại mới được
        //   this.listProductInCart = this.listProductInCart.filter( value => value.MaSanPham !== maSanPham);
        // }else {
          // nếu mà số lượng giảm = 0 rồi thì thôi;
          const quantity = e.soLuong - 1;
          if (quantity === -1){
            // ở đây không làm gì cả nữa
            return;
          }else {
            e.soLuong -= 1;
            return;
          }

        // }
      }
    });
    // *: gán lại vào data chung
    this.data.changeMessage(this.listProductInCart);
  }

  removeAllProduct(maSanPham: string){
    this.listProductInCart = this.listProductInCart.filter( value => value.maSanPham !== maSanPham);

    // *: gán lại vào data chung
    this.data.changeMessage(this.listProductInCart);
  }

  // thêm số lượng sản phẩm ( nút + số lượng )
  addAProduct(maSanPham: string){
    this.listProductInCart.forEach(e => {
      if (e.maSanPham === maSanPham){
          e.soLuong += 1;
          return;
      }
    });

    // lại đổ lại vào trong dữ liệu chung :
    this.data.changeMessage(this.listProductInCart);
  }

  // tính tổng tiền phải thanh toán , cộng từng sản phẩm vào
  total(): number{
    // khó để binding với method nếu sử dụng ViewChirlden nhé, nên map theo biến thì tốt hơn
    // ở đây dùng bên ts nên map theo hàm luôn vẫn ok

    let total = 0;
    this.listProductInCart.forEach(e => {
      total += ((e.gia - (e.giamGia * e.gia * 0.01)) * e.soLuong);
    });

    return total;
  }

  // kiểm tra xem số lượng sản phẩm của một mã ( các sản phẩm đều chắc chắn có rồi): nếu 0 còn thì nút - sẽ bị disable
  checkQuantityInCart(maSP: string): number{
    for (let i = 0; i  < this.listProductInCart.length; i++){
      if (this.listProductInCart[i].maSanPham === maSP){
        return this.listProductInCart[i].soLuong;
      }
    }
  }

  // hiển thị ảnh
  displayImg(imgName: string): string{
    return Number(imgName.replace(' ', '')).toString();
  }
}
