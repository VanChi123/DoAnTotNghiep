import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './containers/users-list/users-list.component';
import {UsersFormComponent} from './containers/users-form/users-form.component';
import {CustomerInformationComponent, LoginHomeComponent, UserDetailComponent} from './containers';
import {LoginGuardGuard} from './guards/login-guard.guard';
import {RegisterHomeComponent} from "./containers/register-home/register-home.component";


const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: 'create',
    component: UsersFormComponent
  },
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
    path: 'register',
    data: { breadcrumb: 'Đăng Ký Tài Khoản' },
    component: RegisterHomeComponent
  },
  {
    path: 'info',
    data: { breadcrumb: 'Thông tin cá nhân' },
    component: CustomerInformationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
