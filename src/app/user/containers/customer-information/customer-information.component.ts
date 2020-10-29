import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserManagementService} from "../../services/user-management.service";
import {ToastrService} from "ngx-toastr";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  user: any;
  formUser: FormGroup;
  editable = true;

  constructor(private fb: FormBuilder,
              private toastrService: ToastrService,
              private sanitizer: DomSanitizer,
              private userManagementService: UserManagementService) {
    this.formUser = fb.group({
      id: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      maKhachHang: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      tenKhachHang: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      ngaySinh: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      gioiTinh: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      diaChi: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      soDienThoai: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      idTaiKhoan: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      img: [''],
      imgBase64: [''],
      fileTail: [''],
      filePathOld: ['']
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user){
      console.log('value', this.user.tenDangNhap);
      console.log('value', this.user);

      this.userManagementService.getUser({typeAccount: 'customer', userName: this.user.tenDangNhap}).subscribe(e => {
        debugger
        this.formUser.patchValue(e.data);
        this.formUser.controls.filePathOld.patchValue(this.formUser.value.img);
        }
      );

    }
  }

  onSave(){
    // this.formUser.value.gioiTinh = this.formUser.value.gioiTinh ? 1 : 0;
    this.userManagementService.updateCustomerInformation(this.formUser.value).subscribe(e =>
      {
        debugger
        this.toastrService.success('Cập nhật thành công', '');
        this.editable = true;
        this.formUser.patchValue(e.data);

        this.formUser.controls.filePathOld.patchValue(this.formUser.value.img);

        // this.decodeImg();
      }
    );
  }

  decodeImg(){
    return atob(this.formUser.value.imgBase64);
  }

  handleGetAvatar(avatar: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${avatar}`);
  }

  file: any;
  onChooseFile(e){
    console.log('e là ', e);
    this.file = e.target.files[0];
    console.log('e là ', this.file);

    const fileNameTailArr = e.target.files[0].name.split('.');
    const tailName = fileNameTailArr[fileNameTailArr.length - 1];

    this.formUser.controls.fileTail.patchValue(tailName);
    this.formUser.controls.img.patchValue(fileNameTailArr[fileNameTailArr.length - 2]);

    if (this.file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.file);
    }
  }

  handleReaderLoaded(e) {
    // this.formUser.controls.imgBase64.patchValue('data:image/png;base64,' + btoa(e.target.result));
    this.formUser.controls.imgBase64.patchValue(btoa(e.target.result));
  }

}
