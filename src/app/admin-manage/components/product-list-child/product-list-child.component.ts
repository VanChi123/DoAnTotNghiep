import {
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  PipeTransform,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {NgbdSortableHeader, SortEvent} from "../../../shared/directives/sortable.directive";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../../shared/services";
// import {DecimalPipe} from "@angular/common";
import {AlertCommon} from "../../../shared/models/alert.model";
import * as _ from 'lodash';
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-product-list-child',
  templateUrl: './product-list-child.component.html',
  styleUrls: ['./product-list-child.component.scss'],
  providers: [DecimalPipe]
})
export class ProductListChildComponent implements OnInit, OnChanges {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Input() violates: any[];

  // click sửa và xóa
  @Output() editData = new EventEmitter();
  @Output() deleteData = new EventEmitter();

  // hiển thị số lượng bản ghi đã filter
  violateTemp: any[];

  // ô lọc dữ liệu theo text truyền vào trên 1 trang
  filter = new FormControl('');

  constructor(private router: Router,
              private alertService: AlertService,
              private pipex: DecimalPipe // sử dụng thẳng này phải có provider ở component nhé
  ) {
  }

  ngOnInit(): void {
    // khi đoạn text filter thay đổi thì lọc dữ liệu
    this.filter.valueChanges.subscribe(e => {
      this.violateTemp = this.search(e, this.pipex);
    });
    // pipe(
    //   startWith(''),
    //   map(text => this.search(text, this.pipex)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.violates){
      this.violateTemp = this.violates;
    }
  }

  onSort({column, direction}: SortEvent) {
    this.resetSorting(column);
    this.violateTemp = _.orderBy(this.violateTemp, [column], [direction]);
  }

  /*
  *  hightline red if dayLeft > 2 days
  * hightline orange if dayleft [1, 2] days
  * hightline green if dayleft < 1 day
  * */
  // setClass(data: any) {
  //   const listRole: any[] = data.quyenSuDungEntities;
  //   let cus = '';
  //   if (listRole.length > 0){
  //     listRole.forEach(e => {
  //       if (e.id === 2){
  //         cus = 'custom';
  //       }
  //     });
  //   }
  //   return cus;
  // }

  private resetSorting(column: any) {
    if (this.headers) {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
    }
  }

  onEdit(violate: any) {
    this.editData.emit(violate);
  }

  onDelete(violate: any) {
    const alert: AlertCommon = {
      title: 'Xóa',
      message: 'Xác nhận xóa?'
    };

    this.alertService.openAlert(alert).afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteData.emit(violate);
      }
    });

  }

  // getListQuyenSuDung(index: number){
  //   const roles: any[] = this.violates[index].quyenSuDungEntities;
  //   if (roles.length === 0 ){
  //     return 'Chưa có quyền';
  //   }
  //
  //   return roles.map(e => e.quyen);
  //
  // }

  search(text: string, pipex: PipeTransform): any[] {
    return this.violates.filter(country => {
      const term = text.toLowerCase();
      return country.maSanPham.toLowerCase().includes(term)
        || country.maSanPham.toLowerCase().includes(term)
        || country.thuongHieuEntity.tenThuongHieu.toLowerCase().includes(term)
        || country.loaiSanPham.tenLoaiSanPham.toLowerCase().includes(term)
        || pipex.transform(country.gia).includes(term);
      // || this.getListQuyenSuDung()
      // || pipe.transform(country.email).includes(term)
      // || pipe.transform(country.quyenSuDung).includes(term);
    });
  }

}
