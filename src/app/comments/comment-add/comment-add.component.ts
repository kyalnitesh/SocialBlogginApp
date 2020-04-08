import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {
  showCommentForm = false;
  id: string;

  constructor(private commentsService: CommentsService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  OnSubmit(commentForm: NgForm) {
    const comment = commentForm.value.comment;
    this.commentsService.addComment(comment, this.id).subscribe(() => {
      commentForm.reset();
      this.showCommentForm = false;
    });
  }

  onShowCommentForm() {
    this.authService.user.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    })
    this.showCommentForm = true;
  }

  onCancel() {
    this.showCommentForm = false;
  }

}
