import {Injectable, OnDestroy} from '@angular/core';
import {AlertComponent} from '../components';
import {AlertCommon} from '../models/alert.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AppConstants} from '../../app.constant';


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

  /**
   * Show popup error. (Type: E)
   * @author PhiLv2
   * @return boolean
   */
  public showErrorBox(message: string) {
    this.openAlert({
      title: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.MSG.title'),
      message: this.getI18nMsg(message),
      icon: AppConstants.ICONS.ERRORS,
      buttons: [{
        name: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.BUTTON.btnClose'),
        color: 'warn'
      }]
    });
  }

  /**
   * Show popup warning. (Type: W)
   * @author PhiLv2
   * @return boolean
   */
  public showWarningBox(message: string) {
    this.openAlert({
      title: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.MSG.title'),
      message: this.getI18nMsg(message),
      icon: AppConstants.ICONS.WARNING,
      buttons: [{
        name: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.BUTTON.btnClose'),
        color: 'warn'
      }]
    });
  }

  /**
   * Show popup success. (Type: I)
   * @author PhiLv2
   * @return boolean
   */
  public showMessageBox(message: string, value?: any) {
    this.openAlert({
      title: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.MSG.title'),
      message: this.getI18nMsg(message, value),
      value,
      icon: AppConstants.ICONS.SUCCESS,
      buttons: [{
        name: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.BUTTON.btnClose'),
        color: 'primary'
      }]
    });
  }

  /**
   * Show popup confirm. (Type: ?)
   * @author PhiLv2
   * @return boolean
   */
  public showConfirmBox<T>(message: string, value?: any) {
    return this.openAlert({
      title: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.MSG.title'),
      message: this.getI18nMsg(message, value),
      value,
      icon: AppConstants.ICONS.CONFIRM,
      buttons: [
        {
          name: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.BUTTON.btnCancel'),
          color: 'primary',
          value: false,
          index: 1
        },
        {
          name: this.getI18nMsg('APP_FEATURE.INVESTOR_SELECTION_PLAN.BUTTON.btnAccept'),
          color: 'accent',
          value: true,
          index: 2
        }
      ]
    });
  }

  /**
   * Get message from i18n json
   * @param key fieldName
   * @param params value
   * @returns message
   * @author PhiLv2
   */
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
