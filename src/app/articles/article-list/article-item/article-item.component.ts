import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from 'src/app/models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  articles: Article[];
  isAuthenticated = false;

  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((data: Article[]) => {
      if (this.router.url === '/home') {
        this.articles = data.slice(0, 3);
      } else {
        this.articles = data;
      }
    });
    this.authService.user.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
      }
    });
  }

  onArticleDelete(article: Article) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      this.articleService.deleteArticle(article.id).subscribe();
      const index = this.articles.indexOf(article);
      this.articles.splice(index, 1);
    }
  }
}
