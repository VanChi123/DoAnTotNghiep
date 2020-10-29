import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleDetailComponent, ArticleListComponent} from "./containers";

const routes: Routes = [
  {
    path: ":slug",
    component: ArticleDetailComponent,
  },
  {
    path: "",
    component: ArticleListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
