import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserManagementService} from "../../services/user-management.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  private unsubcribe$ = new Subject<void>();
  formAdd: FormGroup;
  roles: any[] = [];

  // loại dialog; add hoặc cạp nhật
  typeDialog = 'add';
  roleListId: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AccountAddComponent>,
              private userManagementService: UserManagementService,
              private roleService: RoleService,
              private  toastrService: ToastrService) {
    this.formAdd = this.fb.group({
      tenDangNhap: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-z0-9_-]*$')])],
      matKhau: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-z0-9_-]*$')])],
      email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      quyenSuDung: [''], // status: ['WAITING'] // trạng thái yêu cầu});
    });
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().pipe(takeUntil(this.unsubcribe$)).subscribe(value => {
      if (value && value.data) {
        value.data.forEach(e => {
          e.complete = false;
          this.roles.push(e);
        });

        // nếu là cập nhật thì rolisst id sẽ có phần tử hoặc ko có
        if (this.roleListId.length > 0){
          this.roleListId.forEach(e => {
            this.roles.forEach(r => {
              if (r.id === e){
                r.complete = true;
              }
            });
          });
        }
      }
    });

    // nếu là cập nhật
    if (this.data.event){

      this.typeDialog = 'update';

      // truyền dữ liệu vào form
      this.formAdd.patchValue({tenDangNhap: this.data.event.tenDangNhap,
      matKhau: atob(this.data.event.matKhau),
      email: this.data.event.email});

      // lấy các quyền và lấy ra list id
      const roleUserList = this.data.event.quyenSuDungEntities;
      if (roleUserList.length > 0){
        roleUserList.forEach(e => {
          this.roleListId.push(e.id);
        });
      }
    }
  }

  onAddAccount(){
    const roleList: any[] = [];
    this.roles.forEach(e => {
      if (e.complete === true)
      {
        roleList.push(e.id);
      }
    });

    // mã hóa cho mật khẩu
    this.formAdd.value.matKhau = btoa(this.formAdd.value.matKhau);

    this.userManagementService.addAccountManyRoles({newTaiKhoanEntity: this.formAdd.value, idRoles: roleList})
      .subscribe(e =>
      {
        if (e && e.data && e.success) {
        this.toastrService.success('Thành công', 'Thêm mới');

        this.onCloseDialog();
      }
    });
  }

  onUpdateAccount(){
    const roleList: any[] = [];
    this.roles.forEach(e => {
      if (e.complete === true)
      {
        roleList.push(e.id);
      }
    });

    // mã hóa cho mật khẩu
    this.formAdd.value.matKhau = btoa(this.formAdd.value.matKhau);

    this.userManagementService.updateAccountManyRoles({id: this.data.event.id, newTaiKhoanEntity: this.formAdd.value, idRoles: roleList})
      .subscribe(e =>
      {
        if (e && e.data && e.success) {
          this.toastrService.success('Thành công', 'Cập nhật');

          this.onCloseDialog();
        }

        if (e && e.success === false){
          this.toastrService.warning('Thất bại', 'Cập nhật');
        }
      });
  }

  onCloseDialog(){
    this.dialogRef.close({result: false});
  }

  // xử lý click all
  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.roles != null && this.roles.every(t => t.complete);
  }

  someComplete(): boolean {
    if (this.roles == null) {
      return false;
    }
    return this.roles.filter(t => t.complete).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.roles == null) {
      return;
    }
    this.roles.forEach(t => t.complete = completed);
  }

}
