import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, takeUntil} from 'rxjs/operators';
// import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ebid-breadcrumb',
  template: `
    <ul class="breadcrumb egp-breadcrumb">
      <li *ngFor="let breadcrumb of breadcrumbs; let last=last;"
          class="breadcrumb-item"
          [ngClass]="last ? 'active' : ''"
      >
        <a [routerLink]="breadcrumb.url" *ngIf="!last" (click)="onClick()">
          {{ breadcrumb.label }}
        </a>
        <span  *ngIf="last">{{ breadcrumb.label }}</span>
      </li>
    </ul>
  `,
  styles: [`
    ul.egp-breadcrumb {
      padding: 10px 14px;
      margin-bottom: 0px;
    }

  `]
})
export class AppBreadcrumbComponent implements OnInit, OnDestroy {
  private unsubcribe$ = new Subject<any>();

  public breadcrumbs: Breadcrumb[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService
    ) { }

  ngOnInit() {
    const breadcrumb: Breadcrumb = {
      label: 'Home',
      url: ''
    };

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // set breadcrumbs
      const root: ActivatedRoute = this.route.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
      this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
    });

  }


  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

    // get the child routes
    let children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length === 0) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // append route URL to URL
      url += `/${routeURL}`;

      // add breadcrumb
      const breadcrumb: Breadcrumb = {
        label: this.getI18nMsg(child.snapshot.data[ROUTE_DATA_BREADCRUMB]),
        // label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  private getI18nMsg(key: string): string {
    let i18nMsg: string = '';
    this.translateService.get(key).pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
      if (res) {
        i18nMsg = res;
      }
    })
    return i18nMsg;
  }

  onClick(){
    console.log('xin chào');
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}

export interface Breadcrumb {
  label: string;
  url: string;
}
