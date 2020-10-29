import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Article, RoutingServiceService} from "../../services/routing-service.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]>;
  constructor(private _api: RoutingServiceService) {}

  ngOnInit(): void {
    this.articles$ = this._api.getArticles();


    this.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a quam ornare, bibendum ligula a, rhoncus ligula. Etiam aliquet, justo sollicitudin imperdiet luctus, nulla justo sodales mi, sit amet semper nisl velit vel massa. In hac habitasse platea dictumst.";

  }

  private content: string;
  public query: string;



  public highlight() {
    if(!this.query) {
      return this.content;
    }
    return this.content.replace(new RegExp(this.query, "gi"), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }
}
