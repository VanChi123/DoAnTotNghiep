import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserManagementService} from '../../services/user-management.service';
import {ToastrService} from 'ngx-toastr';
import {takeUntil} from 'rxjs/operators';
import {DataService} from '../../../shared/services';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from "../../../product/services/product.service";
import {AccountAddComponent, ViewImageComponent} from "..";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private router: Router,
              private userManagementService: UserManagementService,
              private dataService: DataService,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private  toastrService: ToastrService) {
    this.formAdd = this.fb.group({
      id: [''],
      maSanPham: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-z0-9_-]*$')])],
      tenSanPham: [''],
      gia: [''],
      doiTuongSuDung: [''],
      kichThuocBeMat: [''],
      chatLieuMatKinh: [''],
      chatLieuDay: [''],
      doDay: [''],
      doDai: [''],
      doRongCuaDay: [''],
      kieuKhoa: [''],
      may: [''],
      khaNangChiuNuoc: [''],
      giamGia: [''],
      img: [''],
      thuongHieuEntity: [''],
      loaiSanPham: [''],
      ngayCapNhap: [''],

      fileTail: [''],
      fileName: [''],
      imgbase64: ['']

    });
  }

  private unsubcribe$ = new Subject<void>();
  formAdd: FormGroup;

  // loại dialog; add hoặc cạp nhật
  typeDialog = 'add';
  // neeus laf cap nhat thi luu tru du lieu get thong tin san pham ve
  product: any;

  models: any[];
  categories: any[];

  // file
  @ViewChild('uploadFile') uploadFileInput: ElementRef;
  @ViewChild('nameFile') nameFile: ElementRef;

  file: any;

  ngOnInit(): void {
    this.getCategories();

    debugger
    if (this.router.url === '/admin/product-add') {
      this.typeDialog = 'add';
    } else {
      this.typeDialog = 'update';
    }

    // nếu là cập nhật
    if (this.typeDialog === 'update') {

      // lấy id trên đường dẫn
      this.activatedRoute
        .params
        .subscribe(params => {
          if (params) {
            const id = params.id;
            this.productService.getAProduct(id).pipe(takeUntil(this.unsubcribe$)).subscribe(e => {
              if (e.data){
                this.product = e.data;
                this.formAdd.patchValue(this.product);

                debugger
                this.formAdd.controls.thuongHieuEntity.patchValue(this.product.thuongHieuEntity.id);
                this.formAdd.controls.loaiSanPham.patchValue(this.product.loaiSanPham.id);

                this.nameFile.nativeElement.value = e.data.img;
              }
            });
          }
        });


      // this.productService.getAProduct()
      //
      // // truyền dữ liệu vào form
      // this.formAdd.patchValue({tenDangNhap: this.data.event.tenDangNhap,
      //   matKhau: atob(this.data.event.matKhau),
      //   email: this.data.event.email});
      //
      // // lấy các quyền và lấy ra list id
      // const roleUserList = this.data.event.quyenSuDungEntities;
      // if (roleUserList.length > 0){
      //   roleUserList.forEach(e => {
      //     this.roleListId.push(e.id);
      //   });
      // }
    }
  }

    onAddAccount()
    {
      this.formAdd.controls.thuongHieuEntity.patchValue({id: Number(this.formAdd.value.thuongHieuEntity)});
      this.formAdd.controls.loaiSanPham.patchValue({id: Number(this.formAdd.value.loaiSanPham)});
      this.userManagementService.addProductAdmin({
        sanPhamEntity: this.formAdd.value,
        imgBase64: this.formAdd.value.imgbase64,
        fileName: this.formAdd.value.fileName,
        fileTail: this.formAdd.value.fileTail
      }).pipe(takeUntil(this.unsubcribe$)).subscribe(e => {
        if (e && e.success) {
          this.toastrService.success('Thành công', 'Thêm mới');

          this.router.navigate(['/admin/product-list']);
        }
        if (e && !e.success) {
          this.toastrService.warning('Thất bại. Mã sản phẩm đã tồn tại', 'Thêm mới');
        }
      });
    }

    onUpdateAccount()
    {
      this.formAdd.controls.thuongHieuEntity.patchValue({id: Number(this.formAdd.value.thuongHieuEntity)});
      this.formAdd.controls.loaiSanPham.patchValue({id: Number(this.formAdd.value.loaiSanPham)});
      this.userManagementService.updateProductAdmin({
        sanPhamEntity: this.formAdd.value,
        imgBase64: this.formAdd.value.imgbase64,
        fileName: this.formAdd.value.fileName,
        fileTail: this.formAdd.value.fileTail
      }).pipe(takeUntil(this.unsubcribe$)).subscribe(e => {
        if (e && e.success) {
          this.toastrService.success('Thành công', 'Cập nhật');

          this.router.navigate(['/admin/product-list']);
        }
        if (e && !e.success) {
          this.toastrService.warning('Thất bại. Mã sản phẩm đã tồn tại', 'Cập nhật');
        }
      });
    }

  private getCategories()
    {
      // Dispatch get thương hiệu
      this.dataService.getAllModels().pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
        if (value) {
          this.models = value.data;
        }
      });

      // Dispatch get loại sản phẩm
      this.dataService.getAllCategories().pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
        if (value) {
          this.categories = value.data;
        }
      });
    }

    // begin: process file
    onUploadFile()
    {
      this.uploadFileInput.nativeElement.value = '';
      this.uploadFileInput.nativeElement.click();
    }
    onChooseFile(e)
    {
      this.file = e.target.files[0];

      const fileNameTailArr = e.target.files[0].name.split('.');
      const tailName = fileNameTailArr[fileNameTailArr.length - 1];

      this.formAdd.controls.fileTail.patchValue(tailName);
      this.formAdd.controls.fileName.patchValue(fileNameTailArr[fileNameTailArr.length - 2]);

      if (this.file) {

        // đổi giá trị cho img cho lúc cập nhật => lên trên nó sẽ cập nhật
        this.formAdd.controls.img.patchValue(e.target.files[0].name);

        this.nameFile.nativeElement.value = e.target.files[0].name;

        const reader = new FileReader();

        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      }
    }

    handleReaderLoaded(e)
    {
      // this.formUser.controls.imgBase64.patchValue('data:image/png;base64,' + btoa(e.target.result));
      this.formAdd.controls.imgbase64.patchValue(btoa(e.target.result));
    }

    // xem ảnh
  onViewImg(){
    const dialogRef = this.dialog.open(
      ViewImageComponent,
      {width: '60vw', minWidth: '300px', height: '550', data: {imgData: this.product},
        panelClass: 'custom-modalbox', disableClose: false}
    );

    dialogRef.afterClosed().pipe(takeUntil(this.unsubcribe$)).subscribe(result => {

      if (result.result === false) {

      }
    });
  }

  }
