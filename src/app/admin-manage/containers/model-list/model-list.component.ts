import {Component, OnDestroy, OnInit, PipeTransform} from '@angular/core';
import {AlertService, DataService} from '../../../shared/services';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {DanhmucService} from '../../services/danhmuc.service';
import {ToastrService} from 'ngx-toastr';
import {AlertCommon} from '../../../shared/models/alert.model';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit, OnDestroy {
  thuongHieuList: any[];
  thuongHieuListTemp: any[];
  private unsub$ = new Subject<void>();

  addForm: boolean;
  ma: any;
  ten: any;
  ttmt: any;
  mt: any;

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
        this.thuongHieuList = this.search(e);
      }

    });

    this.dataService.getAllModels().subscribe(e => {
      if (e.success) {
        debugger
        this.thuongHieuList = e.data;
        this.thuongHieuListTemp = e.data;

        this.thuongHieuList.forEach(value => {
          value.check = false;
        });

        this.thuongHieuListTemp.forEach(ck => {
          ck.check = false;
        });
      }
    });
  }

  onAdd(){
    this.danhmucService.addModel({newThuongHieu: {maThuongHieu: this.ma, tenThuongHieu: this.ten,
      thongTinThuongHieu: this.ttmt, moTa: this.mt}}).subscribe(v => {
        if (v.success){
          this.toastrService.success('Thêm mới thành công');

          this.ma = '';
          this.ten = '';
          this.ttmt = '';
          this.mt = '';
          this.addForm = false;

          this.getListModel();
        }
    });
  }

  onEdit(model: any){
    this.danhmucService.addModel({newThuongHieu: {id: model.id, maThuongHieu: model.maThuongHieu, tenThuongHieu: model.tenThuongHieu,
        thongTinThuongHieu: model.thongTinThuongHieu, moTa: model.moTa}}).subscribe(v => {
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
        this.danhmucService.deleteModel(id).pipe(takeUntil(this.unsub$)).subscribe(e => {
          if (e){
            this.toastrService.success('Xóa', 'Thành công');

            this.getListModel();
          }
        });
      }
    });
  }

  getListModel(){
    this.dataService.getAllModels().subscribe(e => {
      debugger
      if (e.success) {
        this.thuongHieuList = e.data;
        this.thuongHieuListTemp = e.data;
      }
    });
  }

  search(text: string): any[] {
      return this.thuongHieuListTemp.filter(country => {
        const term = text.toLowerCase();
        return country.maThuongHieu?.toLowerCase().includes(term)
          || country.tenThuongHieu?.toLowerCase().includes(term)
          || country.thongTinThuongHieu?.toLowerCase().includes(term)
          || country.moTa?.toLowerCase().includes(term);
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
