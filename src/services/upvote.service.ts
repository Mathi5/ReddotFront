import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpvoteService {

  headers: HttpHeaders | undefined;

  constructor(private http: HttpClient,
  ) { }

  initHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  upvoteComment(commentId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      userUpvotes: commentId
    };
    return this.http.post('http://localhost:3000/users/comments/upvotes/' + userId, body, { headers: this.headers });
  }

  removeUpvoteComment(commentId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      userUpvotes: commentId
    };
    return this.http.post('http://localhost:3000/users/comments/upvotes/remove/' + userId, body, { headers: this.headers });
  }

  downVoteComment(commentId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      userDownvotes: commentId
    };
    return this.http.post('http://localhost:3000/users/comments/upvotes/' + userId, body, { headers: this.headers });
  }

  removeDownvoteComment(commentId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      userDownvotes: commentId
    };
    return this.http.post('http://localhost:3000/users/comments/downvotes/remove/' + userId, body, { headers: this.headers });
  }

  upvotePost(postId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      userUpvotes:postId
    };

    return this.http.post('http://localhost:3000/users/upvotes/' + userId, body, { headers: this.headers });
  }

  removeUpvotePost(postId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      'userUpvotes': `${postId}`
    };
    return this.http.post('http://localhost:3000/users/upvotes/remove/' + userId, body, { headers: this.headers });
  }

  downvotePost(postId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      userDownvotes: postId
    };
    return this.http.post('http://localhost:3000/users/downvotes/' + userId, body, { headers: this.headers });
  }

  removeDownvotePost(postId: String) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    const body = {
      userDownvotes: postId
    };
    return this.http.post('http://localhost:3000/users/downvotes/remove/' + userId, body, { headers: this.headers });
  }
}
