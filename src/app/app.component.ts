import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HomeComponent} from './home/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'demo-app';

  // @ViewChild(HomeComponent) homeComponent: HomeComponent;

  onSeach(e){
    console.log("value", e);
    // console.log("value", this.homeComponent);

    // this.homeComponent.onSearch(e);
  }

  ngAfterViewInit(): void {
  }
}
