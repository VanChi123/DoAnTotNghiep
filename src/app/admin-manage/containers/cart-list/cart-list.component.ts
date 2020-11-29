import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {AlertService, DataService} from "../../../shared/services";
import {DanhmucService} from "../../services/danhmuc.service";
import {ToastrService} from "ngx-toastr";
import {AlertCommon} from "../../../shared/models/alert.model";
import {take, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  list: any[];
  listTemp: any[];
  pagination: any;
  currentPage: number;

  private unsub$ = new Subject<void>();

  customerList: any[]; // danh sách khách hàng
  productList: any[]; // danh sách sản phẩm

  addForm: boolean;
  khachHang: any;
  sanPham: any;
  chiTietSanPham: any;
  soLuong: any;

  // ô lọc dữ liệu theo text truyền vào trên 1 trang
  filter = new FormControl('');

  constructor(private dataService: DataService,
              private danhmucService: DanhmucService,
              private toastrService: ToastrService,
              private alertService: AlertService
  ) {
    // lấy danh sách khách hàng
    this.dataService.getAllCustomer().pipe(takeUntil(this.unsub$)).subscribe(e => {
      if (e) {
        this.customerList = e.data;
      }
    });

    // lấy danh sách sản phẩm
    this.dataService.getAllProducts().pipe(takeUntil(this.unsub$)).subscribe(e => {
      if (e) {
        this.productList = e.data;
      }
    });

  }

  ngOnInit(): void {
    this.currentPage = 0;
    // khi đoạn text filter thay đổi thì lọc dữ liệu
    this.filter.valueChanges.subscribe(e =>
    {
      debugger
      if (e){
        this.list = this.search(e);
      }

    });

    this.danhmucService.getAllCart(this.currentPage).subscribe(e => {
      if (e.success) {
        debugger
        this.list = e.data.content;
        this.listTemp = e.data.content;
        this.pagination = e.data;

        this.list.forEach(value => {
          value.check = false;
        });

        this.listTemp.forEach(ck => {
          ck.check = false;
        });
      }
    });
  }

  onAdd(){

    // debugger
    //
    // console.log('debug', this.sanPham);
    // console.log('debug', this.khachHang);
    // console.log('debug', this.chiTietSanPham);
    // console.log('debug', this.soLuong);
    const pro = this.getProductById(Number(this.sanPham));
    const cus = this.getCustomerById(Number(this.khachHang));

    this.danhmucService.addCart({gioHang: {
      tenSanPham: pro.tenSanPham,
        tenKhachHang: cus.tenKhachHang,
      idChiTietSanPham: this.chiTietSanPham,
        sanPhamEntity: pro,
        khachHangEntity: cus,
        soLuong: this.soLuong
      }}).subscribe(v => {
      if (v.success){
        this.toastrService.success('Thêm mới thành công');

        this.sanPham  = null;
        this.khachHang = null;
        this.soLuong = null;
        this.chiTietSanPham = null;
        this.addForm = false;

        this.getListModel();
      }
    });
  }

  onEdit(model: any){
   // model.khachHangEntity = JSON.parse(model.khachHangEntity.toString());
    debugger
    this.danhmucService.addCart({gioHang: model}).subscribe(v => {
      if (v.success){
        this.toastrService.success('Cập nhật thành công');

        this.getListModel();
      }
    });

  }

  onDelete(id: any){
    const alert: AlertCommon = {
      title: 'Xóa',
      message: 'Xác nhận xóa?'
    };

    this.alertService.openAlert(alert).afterClosed().subscribe(result => {
      if (result === true) {
        this.danhmucService.deleteCart(id).pipe(takeUntil(this.unsub$)).subscribe(e => {
          if (e){
            this.toastrService.success('Xóa', 'Thành công');

            this.getListModel();
          }
        });
      }
    });
  }

  getListModel(){
    this.danhmucService.getAllCart(this.currentPage).subscribe(e => {
      debugger
      if (e.success) {
        this.list = e.data.content;
        this.listTemp = e.data.content;

        this.pagination = e.data;
      }
    });
  }

  search(text: string): any[] {
    return this.listTemp.filter(value => {
      const term = text.toLowerCase();
      return value.tenKhachHang.includes(term) ||
          value.tenSanPham.includes(term);
    });
  }

  // thay đổi lựa chọn khách hàng thì tự động đổi tên khách hàng
  onChangeKhachHang(index: number, value: any) {
    debugger
    const cus = this.getCustomerById(Number(value));

    this.list[index].tenKhachHang = cus.tenKhachHang;
    this.list[index].khachHangEntity = {
        id: Number(cus.id)
      };
  }

  // lấy tên khách hàng theo id khách hàng
  getCustomerById(id: number){
    const kh = this.customerList.find(e => e.id === id);
    return kh;
  }

  ctspList: any[];
  // thay đổi lựa chọn sản phẩm thì tự động đổi tên sản phẩm
  onChangeSanPham(index: number, value: any) {
    debugger
    const pro = this.getProductById(Number(value));
    this.list[index].tenSanPham = pro.tenSanPham;
    this.list[index].sanPhamEntity = {
      id: Number(pro.id)
    };

    // lấy danh sách chi tiết sản phẩm theo sản phẩm
    this.ctspList = pro.chiTietSanPhams;
  }

  // thêm mới thay đổi lựa chọn sản phẩm thì tự động đổi tên sản phẩm
  onChangeSanPhamAdd(value: any) {
    const pro = this.getProductById(Number(value));

    // lấy danh sách chi tiết sản phẩm theo sản phẩm
    this.ctspList = pro.chiTietSanPhams;
  }

  // toStr = JSON.stringify;
  // chọn hci tiết san phảm
  onChangeCTSP(index: any, event: any, model: any){
    debugger
    // this.list[index].idChiTietSanPham = Number(event) ? Number(event) : null;
  }

  // lấy tên sản phẩm theo id sản phẩm
  getProductById(id: number){
    const kh = this.productList.find(e => e.id === id);
    return kh;
  }

  goToPage(event: any) {
    // event là 1 số :ban đầu nó sẽ bắn ra số 1 - page 0
    // ( mặc định nó bắn ra luôn sau khi load list xong nếu mà current page ko custom- khởi tạo riêng)
    const page: string = String(event - 1);

    this.danhmucService.getAllCart(page).pipe(take(1)).subscribe(e => {
      if (e && e.data) {
        this.list = e.data.content;
        this.listTemp = e.data.content;
        this.pagination = e.data;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}

