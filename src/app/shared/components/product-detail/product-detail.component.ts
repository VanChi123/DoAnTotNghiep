import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../models/product.model';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input() product: Product;

  prods: Product[];

  constructor(private data: DataService) {
    this.data.currentMessage.subscribe(messa => {
      this.prods = messa;
    });
  }

  ngOnInit(): void {

    this.data.currentMessage.subscribe(messa => {
      this.prods = messa;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product){
      debugger
    }
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
  // hiển thị ảnh
  displayImg(imgName: string): string{
    return Number(imgName.replace(' ', '')).toString();
  }

  // phần trăm giảm giá
  displayValueOff(price: number): string{
    return '-' + price + '%';
  }

  // giá sau giảm giá
  displayValueAfterOff(price: number, portion: number): number{
    return price - price * portion * 0.01;
  }
}



