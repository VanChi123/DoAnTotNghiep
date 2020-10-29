import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import * as fromComponents from './components';
import {ProductModule} from '../product/product.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductModule,
    MatPaginatorModule,
    SharedModule
  ]
})
export class HomeModule { }
