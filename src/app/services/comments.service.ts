import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  public commentAdded = new Subject<string>();

  constructor(private http: HttpClient) {}

  addComment(comment: string, id: string) {
    let loggedInUserMail = '';
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      loggedInUserMail = userData.email;
    }
    this.commentAdded.next(comment);
    return this.http.post(
      environment.httpRequestBaseURL + '/comment.json',
      { comment: comment, id: id, commentBy: loggedInUserMail }
    );
  }

  getComments() {
    return this.http.get(environment.httpRequestBaseURL + '/comment.json')
    .pipe(
      map(comments => {
        const commentsArray = [];
        for (const key in comments) {
          if (comments.hasOwnProperty(key)) {
            commentsArray.push({ ...comments[key], pid: key });
          }
        }
        return commentsArray;
      }));
}

}
