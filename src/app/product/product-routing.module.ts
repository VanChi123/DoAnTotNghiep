import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductFormComponent} from './containers/product-form/product-form.component';
import {ProductCardComponent, ProductHomeComponent, ProductViewDetailComponent} from './containers';
import {LoginGuardGuard} from "../user/guards/login-guard.guard";


const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Trang Chủ Sản Phẩm'},
    component: ProductHomeComponent
  },
  {
    path: 'view/:maSanPham/:id',
    data: {breadcrumb: 'Xem Chi Tiết Sản Phẩm'},
    component: ProductViewDetailComponent
  },
  {
    path: 'form',
    component: ProductFormComponent
  },
  {
    path: 'cart',
    data: {breadcrumb: 'Giỏ hàng'},
    canActivate: [LoginGuardGuard],
    component: ProductCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
