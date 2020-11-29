import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AccountListComponent, CartListComponent,
  CategoryListComponent, CustomerListComponent, ModelListComponent,
  OrderListComponent,
  ProductAddComponent,
  ProductListComponent, StarListComponent
} from './containers';

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
  ,
  {
    path: 'order-list',
    data: { breadcrumb: 'Quản lý đơn hàng' },
    component: OrderListComponent
  }  ,
  {
    path: 'model-list',
    data: { breadcrumb: 'Quản lý thương hiệu' },
    component: ModelListComponent
  },
  {
    path: 'cat-list',
    data: { breadcrumb: 'Quản lý Danh mục sản phẩm' },
    component: CategoryListComponent
  },
  {
    path: 'star-list',
    data: { breadcrumb: 'Quản lý Danh mục số sao' },
    component: StarListComponent
  },
  {
    path: 'cart-list',
    data: { breadcrumb: 'Quản lý Giỏ hàng' },
    component: CartListComponent
  },
  {
    path: 'customer-list',
    data: { breadcrumb: 'Quản lý Khách hàng' },
    component: CustomerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageRoutingModule { }
