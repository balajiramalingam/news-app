// Application dependencies
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

// External dependencies
import { environment } from '../environments/environment';
import { Article }           from './article';

@Injectable()
export class ArticleService {

  private _articles: BehaviorSubject<Article[]> =
    new BehaviorSubject<Article[]>([]);

  constructor(private http:Http) {
    
   }

  public getArticles():BehaviorSubject<Article[]> {
    return this._articles;
  } 


  public updateArticles(sourceKey = 'bbc-news'): void {
    // make the http request -> Observable
    // map response into article class
    // update our subject
    this._makeHttpRequest('/v1/articles', sourceKey)
      .map(json => json.articles)
        .subscribe(articles => this._articles.next(articles));
  }

  private _makeHttpRequest(
    path: string,
    sourceKey?: string
  ): Observable<any> {

    let params = new URLSearchParams();
    params.set('apiKey', environment.API_KEY);
    
    if (sourceKey && sourceKey !== '') {
      params.set('source', sourceKey);
    }

    return this.http
            .get(`${environment.host}${path}`, {
              search: params
            }).map(resp => resp.json());
  }

}
