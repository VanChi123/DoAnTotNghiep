import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Article, RoutingServiceService} from "../../services/routing-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit{

  article$: Observable<Article>;
  constructor(private _route: ActivatedRoute, private _api: RoutingServiceService) {}

  ngOnInit(): void {
    let slug = this._route.snapshot.paramMap.get("slug");
    this.article$ = this._api.getArticleBySlug(slug);
  }

}
