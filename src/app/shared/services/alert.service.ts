import {Injectable, OnDestroy} from '@angular/core';
import {AlertCommon} from '../models/alert.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AlertComponent} from '../components';

@Injectable({
  providedIn: 'root'
})
export class AlertService implements OnDestroy {
  private unSubscribe$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {
  }

  /**
   * Open alert
   * @param config config: title, message, buttons
   * @author NhuBV2
   */
  public openAlert<T>(config: AlertCommon) {
    const dialogConfig = new MatDialogConfig();
    const data: AlertCommon = {
      title: config.title,
      message: config.message,
      value: config.value,
      icon: config.icon,
      buttons: config.buttons
    };

    dialogConfig.data = {data};

    return this.dialog.open(AlertComponent, dialogConfig);
  }

  public getI18nMsg(key: string, params?: any): string {
    let i18nMsg = '';
    this.translateService.get(key, params).pipe(takeUntil(this.unSubscribe$)).subscribe(res => {
      if (res) {
        i18nMsg = res;
      }
    });
    return i18nMsg;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
