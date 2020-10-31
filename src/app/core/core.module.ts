import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';

// dùng cho đa ngôn ngữ : cài 2 thư viện này nhé
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // dùng cho đa ngôn ngữ
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ]
})
export class CoreModule { }

// dùng cho đa ngôn ngữ
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
//   TranslateHttpLoader(     http: HttpClient,     prefix?: string,     suffix?: string)
// @ngx-translate/http-loader

  // export function HttpLoaderFactory(http: HttpClient) {
  //   return new TranslateHttpLoader(
  //     http,
  //     './assets/i18n/',
  //     '.json'
  //   );
  // }
}
