import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from 'src/app/models/article.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  id: string;
  imagePath: string;
  title: string;
  description: string;
  publishedOn: Date;
  publishedBy: string;

  constructor(private articleService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.articleService.getArticles().subscribe((data: Article[]) => {
      this.article = data.find(x => x.id === this.id);
      this.imagePath = this.article.imagePath;
      this.title = this.article.title;
      this.description  = this.article.description;
      this.publishedOn  = this.article.publishedOn;
      this.publishedBy  = this.article.publishedBy;
    });
  }

}
