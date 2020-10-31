import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HomeComponent} from './home/components';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'demo-app';

  // @ViewChild(HomeComponent) homeComponent: HomeComponent;

  onSeach(e){
    console.log('value', e);
    // console.log("value", this.homeComponent);

    // this.homeComponent.onSearch(e);
  }

  // khởi tạo đa ngôn ngữ
  constructor(public translate: TranslateService) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'vi');
  }

  ngAfterViewInit(): void {
  }
}
