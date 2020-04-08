import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from 'src/app/models/article.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  articlesForm: FormGroup;
  id: string;
  editMode = false;
  article: Article;
  articles: Article[];
  message: string;

  constructor(
    private articleService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.articlesForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      publishedOn: new FormControl(null),
      publishedBy: new FormControl(null)
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id !== null && this.id !== undefined) {
        this.editMode = true;
      }
    });
    this.initForm();
  }

  initForm() {
    let title = '';
    let description = '';
    let imagePath = '';
    if (this.editMode) {
      this.articleService.getArticles().subscribe((data: Article[]) => {
        this.articles = data;
        this.article = data.find(x => x.id === this.id);
        title = this.article.title;
        imagePath = this.article.imagePath;
        description = this.article.description;
        this.articlesForm = new FormGroup({
          title: new FormControl(title, Validators.required),
          imagePath: new FormControl(imagePath, Validators.required),
          description: new FormControl(description, Validators.required),
          publishedOn: new FormControl(null),
          publishedBy: new FormControl(null)
        });
      });
    }
  }

  onSubmit() {
    if (!this.articlesForm.valid) {
      return;
    }
    const val = this.articlesForm.value;
    const userData = JSON.parse(localStorage.getItem('userData'));
    val.publishedOn = new Date();
    val.publishedBy = userData.email;
    if (this.editMode) {
      val.id = this.id;
      this.articleService.updateArticle(val).subscribe(response => {
        this.articlesForm.reset();
        this.message = 'Your article is updated & published!';
      }, error => {
        this.message = error;
      });
    } else {
      this.articleService
        .addArticle(this.articlesForm.value)
        .subscribe(response => {
          this.articlesForm.reset();
          this.message = 'Hurray! Your article is published';
        }, error => {
          this.message = error;
        });
    }
  }

  onCancel() {
    this.articlesForm.reset();
    this.router.navigate(['/articles']);
  }

  OnClose() {
    this.message = null;
    this.router.navigate(['/articles']);
  }

}
