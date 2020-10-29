import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppBreadcrumbComponent} from './app-breadcrumb.component';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {LoginGuardGuard} from "./user/guards/login-guard.guard";

@NgModule({
  declarations: [ // gọi componnent nào ở app.component.html thì phải khai báo ở đây
    AppComponent,
    AppBreadcrumbComponent  // khai báo thằng .ts breacum,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule, // dùng component foooter thì mới import thawngfn này,
    HttpClientModule // khai báo sử dụng httpclient thì dùng thằng này, viết ở đây thì ở các module bên
    // trong đều có thể sử dụng, nếu ko lỗi provider,
    , CommonModule,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
    providers: [LoginGuardGuard,
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
