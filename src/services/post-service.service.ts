import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  getPosts() {
    return this.http.get(`http://localhost:3000/posts/`);
  }

  getPostById(id: string) {
    return this.http.get(`http://localhost:3000/posts/${id}`);
  }
}
