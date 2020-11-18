import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ChangePasswordComponent,
  CustomerInformationComponent,
  LoginHomeComponent, RegisterHomeComponent,
  UserDetailComponent
} from './containers';



const routes: Routes = [
  // {
  //   path: '',
  //   component: UsersListComponent
  // },
  // {
  //   path: 'create',
  //   component: UsersFormComponent
  // },
  {
    path: 'create/:idGiDo',  // để sử dụng phải import Router + inject constructor, ở giao diện phải navigate đến đường dấn đó
    // ở bên nhận phải khai báo Activateroute và lấy trên đường dẫn
    component: UserDetailComponent
  },
  {
    path: 'login',
    // data: { breadcrumb: 'Đăng Nhập' },
    data: { breadcrumb: 'APP_FEATURE.COMMON.TITLE' },
    component: LoginHomeComponent
  },
  {
    path: 'change-password',
    // data: { breadcrumb: 'Đăng Nhập' },
    data: { breadcrumb: 'APP_FEATURE.COMMON.TITLE' },
    component: ChangePasswordComponent
  },
  {
    path: 'register',
    data: { breadcrumb: 'Đăng Ký Tài Khoản' },
    component: RegisterHomeComponent
  },
  {
    path: 'info',
    data: { breadcrumb: 'Thông tin cá nhân' },
    component: CustomerInformationComponent
  },
  // {
  //   path: 'list',
  //   data: { breadcrumb: 'Danh Sách tài khoản' },
  //   component: AccountListComponent
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
