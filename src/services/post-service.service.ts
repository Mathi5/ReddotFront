import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  headers: HttpHeaders | undefined;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  initHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  getPosts() {
    this.initHeaders();
    return this.http.get(`http://localhost:3000/posts/`, {headers: this.headers});
  }

  getPostsByDate() {
    this.initHeaders();
    return this.http.get(`http://localhost:3000/posts/date`, {headers: this.headers});
  }

  getPostsByPopularity() {
    this.initHeaders();
    return this.http.get(`http://localhost:3000/posts/popularity`, {headers: this.headers});
  }

  getPostById(id: string) {
    this.initHeaders();
    return this.http.get(`http://localhost:3000/posts/${id}`, {headers: this.headers});
  }

  getSubPostsByDate(id: string) {
    this.initHeaders();
    return this.http.get(`http://localhost:3000/posts/date/${id}`, {headers: this.headers});
  }

  getSubPostsByPopularity(id: string) {
    this.initHeaders();
    return this.http.get(`http://localhost:3000/posts/popularity/${id}`, {headers: this.headers});
  }

  addPost(subReddotId: string, title: string, content: string, media: string, file: any, userId: string) {
    this.initHeaders();
    const body = {
      title: title,
      content: content,
      postSub: subReddotId,
      postUser: userId,
      media: media,
      file: file
    }

    return this.http.post('http://localhost:3000/posts/', body, {headers: this.headers});
  }

  getPostBySubId(id: string) {
    this.initHeaders();
    return this.http.get(`http://localhost:3000/posts/sub/${id}`, {headers: this.headers});
  }
}
