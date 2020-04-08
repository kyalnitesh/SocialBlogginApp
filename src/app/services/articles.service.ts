import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private http: HttpClient) {}

  addArticle(article: Article) {
    return this.http.post(
      environment.httpRequestBaseURL + '/article.json',
      article
    );
  }

  updateArticle(updatedArticle: Article) {
    return this.http.put(
      environment.httpRequestBaseURL + '/article/' +
        updatedArticle.id +
        '.json',
      updatedArticle
    );
  }

  getArticles() {
    let loggedInUserMail = '';
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      loggedInUserMail = userData.email;
    }
    return this.http
      .get(environment.httpRequestBaseURL + '/article.json')
      .pipe(
        map(articles => {
          const articlesArray = [];
          for (const key in articles) {
            if (articles.hasOwnProperty(key)) {
              let toHideEditAndDelete = true;
              if (articles[key].publishedBy === loggedInUserMail) {
                toHideEditAndDelete = false;
              }
              articlesArray.push({ ...articles[key], id: key, toHideControls: toHideEditAndDelete });
            }
          }
          return articlesArray;
        })
      );
  }

  deleteArticle(id: string) {
    return this.http.delete(
      environment.httpRequestBaseURL + '/article/' + id + '.json'
    );
  }
}
