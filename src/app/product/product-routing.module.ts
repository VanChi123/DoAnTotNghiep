import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  ProductCardComponent,
  ProductFavoriteComponent,
  ProductHomeComponent,
  ProductViewDetailComponent
} from './containers';
import {LoginGuardGuard} from '../user/guards/login-guard.guard';
import {ProductPaymentComponent} from './containers/product-payment/product-payment.component';


const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Trang Chủ Sản Phẩm'},
    component: ProductHomeComponent
  },
  {
    path: 'favorite',
    data: {breadcrumb: 'Sản phẩm yêu thích'},
    component: ProductFavoriteComponent
  },
  {
    path: 'view/:maSanPham/:id',
    data: {breadcrumb: 'Xem Chi Tiết Sản Phẩm'},
    component: ProductViewDetailComponent
  },
  {
    path: 'cart',
    data: {breadcrumb: 'Giỏ hàng'},
    canActivate: [LoginGuardGuard],
    component: ProductCardComponent
  }
  ,
  {
    path: 'payment/:id',
    data: {breadcrumb: 'Thanh toán'},
    canActivate: [LoginGuardGuard],
    component: ProductPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
