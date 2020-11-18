import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DatePickerAdapter, DEPS, FORMAT_MAT_DATEPICKER} from '../shared/directives/dateFormat';
import {SharedModule} from '../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import {NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    ...fromComponents.containers,  // cái báo các component ở index của container
    ...fromContainers.containers
  ],
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

  ]
  ,
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
    ],
  // entryComponents: [
  //   AccountAddComponent
  // ]
})
export class UserModule { }
