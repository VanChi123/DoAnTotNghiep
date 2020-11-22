import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppBreadcrumbComponent} from './app-breadcrumb.component';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {LoginGuardGuard} from './user/guards/login-guard.guard';
import {CoreModule} from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

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
    HttpClientModule, // khai áo sử dụng httpclient thì dùng thằng này, viết ở đây thì ở các module bên
    // trong đều có thể sử dụng, nếu ko lỗi provider,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,

    CoreModule, NgbModule

  ],
  providers: [LoginGuardGuard,
    DatePipe // cái này phải sử dụng ở đây, dùng ở trong module nó ko được ????
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
