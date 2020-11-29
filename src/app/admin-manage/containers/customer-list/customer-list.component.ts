import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {AlertService, DataService} from "../../../shared/services";
import {DanhmucService} from "../../services/danhmuc.service";
import {ToastrService} from "ngx-toastr";
import {AlertCommon} from "../../../shared/models/alert.model";
import {take, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  list: any[];
  listTemp: any[];
  pagination: any;
  currentPage: number;

  listAccount: any[];

  private unsub$ = new Subject<void>();

  addForm: boolean;
  maKhachHang: any; // string
  tenKhachHang: any; // string
  ngaySinh: any;  // date
  gioiTinh: any; // String
  diaChi: any; // boolean
  soDienThoai: any; // String
  img: any; // img

  imgBase64: any; // string
  idTaiKhoan: any; // string

  // ô lọc dữ liệu theo text truyền vào trên 1 trang
  filter = new FormControl('');

  constructor(private dataService: DataService,
              private danhmucService: DanhmucService,
              private toastrService: ToastrService,
              private alertService: AlertService
  ) {
    // lấy list tài khoản
    this.danhmucService.getAllAccount().pipe(takeUntil(this.unsub$)).subscribe(e => {
      this.listAccount = e.data;
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

    this.danhmucService.getAllCustomer(this.currentPage).subscribe(e => {
      if (e.success) {
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

  onChooseFile(event){
    debugger
    const file = event[0];
    this.img = file.name;

    if (file) {

      // this.nameFile.nativeElement.value = e.target.files[0].name;

      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    // this.formUser.controls.imgBase64.patchValue('data:image/png;base64,' + btoa(e.target.result));
    // this.formUser.controls.imgBase64.patchValue(btoa(e.target.result));
    this.imgBase64 = btoa(e.target.result);
  }

  onAdd(){
    debugger

    this.danhmucService.addCustomer({khachHangEntity: {
        maKhachHang: this.maKhachHang,
        tenKhachHang: this.tenKhachHang,
        ngaySinh: this.ngaySinh, // 2021-09-09
        diaChi: this.diaChi,
        gioiTinh: this.gioiTinh,
        soDienThoai: this.soDienThoai,
        img: this.img, //C:\fakepath\tên file với <input type="file" [(ngModel)]="img"/>
                        // nếu sử dung (ngModelOnchange với input file thì event sẽ cho ra C:fakepath/tên file
                        // nếu sử dung (change)êvent thì cũng twuong tự với input file thì event sẽ cho ra C:fakepath/tên file
        idTaiKhoan: this.idTaiKhoan
    },
      imgBase64: this.imgBase64
    }).subscribe(v => {
      if (v.success){
        this.toastrService.success('Thêm mới thành công');

        // this.ma = '';
        // this.ten = '';
        // this.ttmt = '';
        // this.mt = '';
        this.addForm = false;

        this.getListModel();
      }
    });
  }

  onEdit(model: any){
    this.danhmucService.addModel({khachHangEntity:
        {id: model.id,
          maThuongHieu: model.maThuongHieu,
          tenThuongHieu: model.tenThuongHieu,
        thongTinThuongHieu: model.thongTinThuongHieu,
          moTa: model.moTa
        }}).subscribe(v => {
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
        this.danhmucService.deleteCustomer(id).pipe(takeUntil(this.unsub$)).subscribe(e => {
          if (e){
            this.toastrService.success('Xóa', 'Thành công');

            this.getListModel();
          }
        });
      }
    });
  }

  getListModel(){
    this.danhmucService.getAllCustomer(this.currentPage).subscribe(e => {
      debugger
      if (e.success) {
        this.list = e.data.content;
        this.listTemp = e.data.content;
        this.pagination = e.data;
      }
    });
  }

  search(text: string): any[] {
    return this.listTemp.filter(country => {
      const term = text.toLowerCase();
      return country.maThuongHieu?.toLowerCase().includes(term)
        || country.tenThuongHieu?.toLowerCase().includes(term)
        || country.thongTinThuongHieu?.toLowerCase().includes(term)
        || country.moTa?.toLowerCase().includes(term);
    });
  }

  goToPage(event: any) {
    // event là 1 số :ban đầu nó sẽ bắn ra số 1 - page 0
    // ( mặc định nó bắn ra luôn sau khi load list xong nếu mà current page ko custom- khởi tạo riêng)
    const page: string = String(event - 1);
    // this.currentPage = page;

    this.danhmucService.getAllCustomer(page).pipe(take(1)).subscribe(e => {
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
