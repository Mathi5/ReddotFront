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
    return this.http.get(`https://reddot-back.onrender.com/comments/post/${postId}`);
  }

  sendComment(comment:Comment) { 
    return this.http.post(`https://reddot-back.onrender.com/comments/`, comment);
  }
}
