import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {AlertService, DataService} from '../../../shared/services';
import {AlertCommon} from "../../../shared/models/alert.model";
import {takeUntil} from "rxjs/operators";
import {DanhmucService} from "../../services/danhmuc.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  danhMucList: any[];
  danhMucListTemp: any[];
  private unsub$ = new Subject<void>();

  // ô lọc dữ liệu theo text truyền vào trên 1 trang
  filter = new FormControl('');

  addForm: boolean;
  ten: any;

  constructor(private dataService: DataService,
              private toastrService: ToastrService,
              private alertService: AlertService,
              private danhmucService: DanhmucService) { }

  ngOnInit(): void {
    // khi đoạn text filter thay đổi thì lọc dữ liệu
    this.filter.valueChanges.subscribe(e =>
    {
        this.danhMucList = this.search(e);
    });

    this.dataService.getAllCategories().subscribe(e => {
      if (e.success) {
        this.danhMucList = e.data;
        this.danhMucListTemp = e.data;

        this.danhMucList.forEach(dm => dm.check = false);
        this.danhMucListTemp.forEach(dm => dm.check = false);
      }
    });
  }

  onAdd(){
    this.danhmucService.addCategory({loaiSanPham: {tenLoaiSanPham: this.ten}}).pipe(takeUntil(this.unsub$)).subscribe(v => {
      if (v && v.success){
        this.toastrService.success('Thêm mới thành công');
        this.ten = '';
        this.addForm = false;

        this.getListModel();
      }
    });
  }

  onEdit(model: any){
    this.danhmucService.addCategory({loaiSanPham: {tenLoaiSanPham: model.tenLoaiSanPham,
        id: model.id}}).pipe(takeUntil(this.unsub$)).subscribe(v => {
      if (v && v.success){
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
        this.danhmucService.deleteCategory(id).pipe(takeUntil(this.unsub$)).subscribe(e => {
          if (e){
            this.toastrService.success('Xóa', 'Thành công');

            this.getListModel();
          }
        });
      }
    });
  }

  getListModel(){
    this.dataService.getAllCategories().subscribe(e => {
      if (e.success) {
        this.danhMucList = e.data;
        this.danhMucListTemp = e.data;

        // this.danhMucList.forEach(dm => dm.check = false);
        // this.danhMucListTemp.forEach(dm => dm.check = false);
      }
    });
  }

  search(text: string): any[] {
    return this.danhMucListTemp.filter(country => {
      const term = text.toLowerCase();
      return country.id === term
        || country.tenLoaiSanPham?.toLowerCase().includes(term);
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
