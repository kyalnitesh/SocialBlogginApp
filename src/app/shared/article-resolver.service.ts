import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticlesService } from '../services/articles.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ArticleResolverService implements Resolve<Article[]> {
    constructor(private articleService: ArticlesService) {}

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const articles = this.articleService.getArticles();
        return articles;
    }
}
