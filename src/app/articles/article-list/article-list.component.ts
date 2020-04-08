import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  isButtonVisible = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/home') {
      this.isButtonVisible = false;
    }
  }

}
