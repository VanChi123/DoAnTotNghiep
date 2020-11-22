import {AccountListComponent} from './account-list/account-list.component';
import {AccountAddComponent} from './account-add/account-add.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ViewImageComponent} from './view-image/view-image.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderPaymentComponent} from "./order-payment/order-payment.component";

export const containers: any[] = [
  AccountListComponent,
  AccountAddComponent,
  AdminHomeComponent,
  ProductListComponent,
  ProductAddComponent,
  ViewImageComponent,
  OrderListComponent,
  OrderPaymentComponent
];

export * from './account-add/account-add.component';
export * from './account-list/account-list.component';
export * from './admin-home/admin-home.component';
export * from './product-list/product-list.component';
export * from './product-add/product-add.component';
export * from './view-image/view-image.component';
export * from './order-list/order-list.component';
export * from './order-payment/order-payment.component';
