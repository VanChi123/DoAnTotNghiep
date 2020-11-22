import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AdminManageRoutingModule } from './admin-manage-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import {SharedModule} from '../shared/shared.module';
import {NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {ViewImageComponent} from "./containers";

@NgModule({
  declarations: [
    ...fromComponents.containers,  // cái báo các component ở index của container
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    AdminManageRoutingModule,

    // import share module để sử dụng module Translate vì bên kia nó cả import lẫn export
    // // Translation
    SharedModule,
    NgbPaginationModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    NgbTypeaheadModule,
    // TranslateModule,
    // TranslateModule,

    ReactiveFormsModule,
    MatIconModule,
    // MatFormFieldModule,
    MatSidenavModule,

    MatFormFieldModule, // thằng này và thằng dưới phải đi với nhau ko thì báo lỗi : mat-form-field must contain a MatFormFieldControl,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    // nếu ko khai báo thì mat-button sẽ xấu và chả có css gì ý, nhưng ko báo lỗi
    // 2 thằng này khai báo xong thì phải restart project ko nó ko nhận đâu

  ],
  entryComponents: [
    ViewImageComponent
  ],
  providers: [
    // DatePipe // sử dụng date pipe trong pdf make, tuy nhiên ko lên chả biết tại sao
  ]
})
export class AdminManageModule { }
