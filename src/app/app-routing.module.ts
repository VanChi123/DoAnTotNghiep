import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserHomeComponent} from './user/containers/user-home/user-home.component';
import {AdminHomeComponent} from './admin-manage/containers/admin-home/admin-home.component';

const routes: Routes = [
  {
  path: 'home',
  data: { breadcrumb: 'Trang chủ' },
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
},
  {
    path: 'user',
    data: { breadcrumb: 'User' },
    component: UserHomeComponent, // có 1 component chứa router outlet để hiển thị các link khác
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    data: { breadcrumb: 'Admin' },
    component: AdminHomeComponent, // có 1 component chứa router outlet để hiển thị các link khác
    loadChildren: () => import('./admin-manage/admin-manage.module').then(m => m.AdminManageModule)
  },
  {
    path: 'product',
    data: { breadcrumb: 'Product' },
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'routing',
    // data: { breadcrumb: 'RoutingDemo' },
    data: { breadcrumb: 'APP_FEATURE.COMMON.TITLE' },
    loadChildren: () => import('./routing/routing.module').then(m => m.RoutingModule)
  },

  // khi load trang chủ thì vào home
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // cho mặc định những route không đúng về home
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
