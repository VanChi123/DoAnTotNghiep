import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UsersFormComponent } from './containers/users-form/users-form.component';
import { FormUserComponent } from './components/form-control/form-user.component';
import { FormListComponent } from './components/form-list/form-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormNestedComponent } from './components/form-nested/form-nested.component';
import { FormWithFormbuilderComponent } from './components/form-with-formbuilder/form-with-formbuilder.component';

import * as containers from './containers/index';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DatePickerAdapter, DEPS, FORMAT_MAT_DATEPICKER} from '../shared/directives/dateFormat';
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    containers.containers,  // cái báo các component ở index của container
    FormUserComponent, FormListComponent, FormGroupComponent, FormNestedComponent, FormWithFormbuilderComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    // for mat-date picker + must follow providers + import finish afer that restart project
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    // end for mat-date picker + must follow providers

    // import share module để sử dụng module Translate vì bên kia nó cả import lẫn export
    // // Translation
    SharedModule,
    // TranslateModule,
    // TranslateModule,
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: DateAdapter,
      useClass: DatePickerAdapter,
      deps: DEPS
    },
    {provide: MAT_DATE_FORMATS, useValue: FORMAT_MAT_DATEPICKER}
  ],
  exports: [
    // TranslateModule
    ]
})
export class UserModule { }
