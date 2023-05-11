import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers : HttpHeaders | undefined;
  constructor(
    private http: HttpClient,
  ) { }

  initHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  getUser() {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    return this.http.get('http://localhost:3000/users/' + userId, {headers: this.headers});
  }

  checkUserPseudo(pseudo: string) {
    this.initHeaders();
    const body = {
      pseudo: pseudo
    }
    return this.http.post('http://localhost:3000/users/checkpseudo', body, {headers: this.headers});
  }

  checkUserMail(mail: string) {
    this.initHeaders();
    const body = {
      mail: mail
    }
    return this.http.post('http://localhost:3000/users/checkmail', body, {headers: this.headers});
  }

  checkUserData(mail: string, pseudo: string) {
    return new Observable(observer => {
      this.checkUserMail(mail).subscribe((res) => {
        console.log(res);
        if (res) {
          return this.checkUserPseudo(pseudo).subscribe((res) => {
            return res ? observer.next(true) : observer.next(false);
          });
        } else {
          return false;
        }
      });
    });
  }

  register(pseudo: string, mail: string, password: string) {
    this.initHeaders();
    const body = {
      mail: mail,
      pseudo: pseudo,
      password: password
    }
    return this.http.post('http://localhost:3000/users/', body, {headers: this.headers});
  }
}
