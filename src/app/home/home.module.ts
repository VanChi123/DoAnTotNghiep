import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import * as fromComponents from './components';
import {ProductModule} from '../product/product.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SharedModule} from '../shared/shared.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductModule,
    MatPaginatorModule,
    SharedModule,
    // MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,

    // BrowserModule ( chỉ xuất hineej 1 lần trong project ?, /* or CommonModule( có thể xuất hiện nhiều lần chăng) + 2 thằng dưới thì mới dugnf đc form nhé* ko thì báo lỗi null no provider form builder */
    FormsModule, ReactiveFormsModule,

    MatFormFieldModule, // thằng này và thằng dưới phải đi với nhau ko thì báo lỗi : mat-form-field must contain a MatFormFieldControl,
    MatInputModule,

    MatButtonModule, // 2 thằng này để css cho mattbutton đẹp nhé
    MatSelectModule,
  ]
})
export class HomeModule { }
