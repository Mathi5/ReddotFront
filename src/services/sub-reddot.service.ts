import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubReddotService {

  headers: HttpHeaders | undefined;
  constructor(
    private http: HttpClient,
  ) {  }

  initHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }
  getSubReddots() {
    this.initHeaders();
    return this.http.get('http://localhost:3000/subreddots/', {headers: this.headers});
  }

  getSubReddot(id: string) {
    this.initHeaders();
    return this.http.get('http://localhost:3000/subreddots/' + id, {headers: this.headers});
  }

  getFeaturedSubReddots() {
    this.initHeaders();
    console.log('coucou');
    return this.http.get('http://localhost:3000/subreddots/featured', {headers: this.headers});
  }

  addSubReddot(name: string, description: string, icon: string) {
    this.initHeaders();

    const body = {
      name: name,
      description: description,
      icon: icon,
    }

    return this.http.post('http://localhost:3000/subreddots/', body, {headers: this.headers});
  }
}
