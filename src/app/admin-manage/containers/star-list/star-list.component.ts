import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {AlertService, DataService} from "../../../shared/services";
import {DanhmucService} from "../../services/danhmuc.service";
import {ToastrService} from "ngx-toastr";
import {AlertCommon} from "../../../shared/models/alert.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-star-list',
  templateUrl: './star-list.component.html',
  styleUrls: ['./star-list.component.scss']
})
export class StarListComponent implements OnInit, OnDestroy {
  list: any[];
  listTemp: any[];
  private unsub$ = new Subject<void>();

  addForm: boolean;
  soSao: any;

  // ô lọc dữ liệu theo text truyền vào trên 1 trang
  filter = new FormControl('');

  constructor(private dataService: DataService,
              private danhmucService: DanhmucService,
              private toastrService: ToastrService,
              private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // khi đoạn text filter thay đổi thì lọc dữ liệu
    this.filter.valueChanges.subscribe(e =>
    {
      debugger
      if (e){
        this.list = this.search(e);
      }

    });

    this.danhmucService.getAllStar().subscribe(e => {
      if (e.success) {
        debugger
        this.list = e.data;
        this.listTemp = e.data;

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
    this.danhmucService.addStar({star: {soSao: this.soSao}}).subscribe(v => {
      if (v.success){
        this.toastrService.success('Thêm mới thành công');

        this.soSao = '';
        this.addForm = false;

        this.getListModel();
      }
    });
  }

  onEdit(model: any){
    this.danhmucService.addStar({star: {soSao: model.soSao, id: model.id}}).subscribe(v => {
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
        this.danhmucService.deleteStar(id).pipe(takeUntil(this.unsub$)).subscribe(e => {
          if (e){
            this.toastrService.success('Xóa', 'Thành công');

            this.getListModel();
          }
        });
      }
    });
  }

  getListModel(){
    this.danhmucService.getAllStar().subscribe(e => {
      debugger
      if (e.success) {
        this.list = e.data;
        this.listTemp = e.data;
      }
    });
  }

  search(text: string): any[] {
    return this.listTemp.filter(value => {
      const term = text.toLowerCase();
      return value.soSao === term;
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
