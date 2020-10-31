import * as viewShare from './components';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {FormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    ...viewShare.components
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    FormsModule,
    MatMenuModule,
    // RouterModule
    MatDialogModule,

    // sử dùng translate i18n thì phải import
   TranslateModule
  ],
  providers: [],
  exports: [
    ...viewShare.components,

    // // sử dùng translate i18n thì phải import và export để mọi thừng khác dùng
    TranslateModule
  ]
})
export class SharedModule {
}
