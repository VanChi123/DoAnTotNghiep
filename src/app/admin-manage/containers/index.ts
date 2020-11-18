import {AccountListComponent} from './account-list/account-list.component';
import {AccountAddComponent} from './account-add/account-add.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ViewImageComponent} from './view-image/view-image.component';

export const containers: any[] = [
  AccountListComponent,
  AccountAddComponent,
  AdminHomeComponent,
  ProductListComponent,
  ProductAddComponent,
  ViewImageComponent
];

export * from './account-add/account-add.component';
export * from './account-list/account-list.component';
export * from './admin-home/admin-home.component';
export * from './product-list/product-list.component';
export * from './product-add/product-add.component';
export * from './view-image/view-image.component';
