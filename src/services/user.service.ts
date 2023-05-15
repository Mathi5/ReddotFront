import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from "rxjs";
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {} as User;
  static userSubject = new Subject<User>();

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
    return this.http.get('https://reddot-back.onrender.com/users/' + userId, {headers: this.headers});
  }

  getUserById(userId:string) {
    this.initHeaders();
    return this.http.get('https://reddot-back.onrender.com/users/' + userId, {headers: this.headers});
  }

  getUserId():String {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    return userId ?? '';
  }

  updateUser(updatedUser: User) {
    this.initHeaders();
    const userId = localStorage.getItem('userId');
    return this.http.put(`https://reddot-back.onrender.com/users/${userId}`, updatedUser, {headers: this.headers});
  }

  checkUserPseudo(pseudo: string) {
    this.initHeaders();
    const body = {
      pseudo: pseudo
    }
    return this.http.post('https://reddot-back.onrender.com/users/checkpseudo', body, {headers: this.headers});
  }

  checkUserMail(mail: string) {
    this.initHeaders();
    const body = {
      mail: mail
    }
    return this.http.post('https://reddot-back.onrender.com/users/checkmail', body, {headers: this.headers});
  }

  checkUserData(mail: string, pseudo: string) {
    return new Observable(observer => {
      this.checkUserMail(mail).subscribe((res) => {
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
    return this.http.post('https://reddot-back.onrender.com/users/', body, {headers: this.headers});
  }

  initUser() {
    this.getUser().subscribe((res) => {
      this.user = res as User;
      UserService.userSubject.next(res as User);
    });
  }
  public static getUserAsObservable() {
    return UserService.userSubject.asObservable();
  }

  subscribeToSubreddot(subreddotId: string) {
    this.initHeaders();
    const body = {
      userSubscribes: subreddotId,
    }
    return this.http.put('https://reddot-back.onrender.com/users/subscribe/' + localStorage.getItem('userId'), body, {headers: this.headers});
  }

  unsubscribeToSubreddot(subreddotId: string) {
    this.initHeaders();
    const body = {
      userSubscribes: subreddotId,
    }
    return this.http.put('https://reddot-back.onrender.com/users/unsubscribe/' + localStorage.getItem('userId'), body, {headers: this.headers});
  }

  isSubscribedToSubreddot(subreddotId: string) {
    this.initHeaders();
    const body = {
      userSubscribes: subreddotId,
    }
    return this.http.post('https://reddot-back.onrender.com/users/issubscribed/' + localStorage.getItem('userId') , body, {headers: this.headers});
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }
}
