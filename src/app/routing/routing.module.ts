import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingRoutingModule } from './routing-routing.module';
import * as containers from './containers';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ...containers.containers
  ],
  imports: [
    CommonModule,
    RoutingRoutingModule,
    FormsModule
  ]
})
export class RoutingModule { }
