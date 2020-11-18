import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountListComponent, AdminHomeComponent, ProductAddComponent, ProductListComponent} from './containers';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Home' },
    component: AccountListComponent
  },
  {
    path: 'account-list',
    data: { breadcrumb: 'Danh Sách tài khoản' },
    component: AccountListComponent
  },
  {
    path: 'product-list',
    data: { breadcrumb: 'Danh sách sản phẩm' },
    component: ProductListComponent
  },
  {
    path: 'product-add',
    data: { breadcrumb: 'Thêm mới sản phẩm' },
    component: ProductAddComponent
  }
  ,
  {
    path: 'product-update/:id',
    data: { breadcrumb: 'Cập nhật sản phẩm' },
    component: ProductAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageRoutingModule { }
