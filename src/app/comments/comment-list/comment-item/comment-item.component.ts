import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute, Params } from '@angular/router';

export interface commentsResponse {
  pid: string;
  comment: string;
  id: string;
  commentBy: string;
}

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  comments: commentsResponse[];
  id: string;

  constructor(
    private commentService: CommentsService,
    private route: ActivatedRoute
  ) {
    this.commentService.commentAdded.subscribe(comment => {
      let loggedInUserMail = '';
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        loggedInUserMail = userData.email;
      }
      if (comment != null) {
        this.comments.push({
          comment: comment,
          id: '0',
          pid: '0',
          commentBy: loggedInUserMail
        });
      }
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.commentService.getComments().subscribe((data: commentsResponse[]) => {
      this.comments = data.filter(x => x.id === this.id);
    });
  }
}
