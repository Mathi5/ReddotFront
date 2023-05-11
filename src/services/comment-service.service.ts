import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient,
  ) { }

  getCommentsFromPost(postId: String) {
    return this.http.get(`http://localhost:3000/comments/post/${postId}`);
  }
}
