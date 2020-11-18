import * as viewShare from './components';
import * as fromSharedServices from './services';

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
import {NgbdSortableHeader} from './directives/sortable.directive';
import {MatButtonModule} from '@angular/material/button';
import {SafePipe} from './pipe/safe';
import {MatPaginatorIntl} from '@angular/material/paginator';


@NgModule({
  declarations: [
    ...viewShare.components,

    NgbdSortableHeader,
    SafePipe
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
        TranslateModule,
        MatButtonModule
    ],
  providers: [
    ...fromSharedServices.services,

    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  exports: [
    ...viewShare.components,

    // // sử dùng translate i18n thì phải import và export để mọi thừng khác dùng
    TranslateModule,
    SafePipe,
    NgbdSortableHeader, // sử dụng cho table sort: declare + export
  ],
  entryComponents: [
    viewShare.AlertComponent,
  ]
})
export class SharedModule {
}

// dùng để thay dổi title của phân trang anuglar paginator, sử dụng bằng cách
// cách 1: provider tại share dderer dùng chung
// cách 2: ở componet khai báo provider
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Số lượng sản phẩm';

  return customPaginatorIntl;
}
