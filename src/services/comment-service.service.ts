import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient,
  ) { }

  getCommentsFromPost(postId: String) {
    return this.http.get(`http://localhost:3000/comments/post/${postId}`);
  }

  sendComment(comment:Comment) { 
    return this.http.post(`http://localhost:3000/comments/`, comment);
  }
}
