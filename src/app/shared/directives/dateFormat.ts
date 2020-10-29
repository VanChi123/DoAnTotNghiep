import {Injectable} from '@angular/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
// library npm i @angular/material-moment-adapter + libray: moment: npm i moment
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {AppConstants} from '../models/constant';


/*
* @author NhuBV2
* @custom GiangDV3
* Change format material datepicker to dd/MM/yyyy
* Provider this at your container to get effect
* Eg:
* providers: [
    {
      provide: DateAdapter,
      useClass: DatePickerAdapter,
      deps: DEPS
    },
    {provide: MAT_DATE_FORMATS, useValue: FORMAT_MAT_DATEPICKER}
  ]
* */
export const FORMAT_MAT_DATEPICKER = {
  parse: {
    dateInput: AppConstants.DATE_FORMAT_QUERY_DDMMYY,
  },
  display: {
    dateInput: AppConstants.DATE_FORMAT_QUERY_DDMMYY,
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: AppConstants.DATE_FORMAT_QUERY_DDMMYY,
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Injectable()
export class DatePickerAdapter extends MomentDateAdapter {
// custom here
}

export const DEPS = [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS];
