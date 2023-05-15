import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  token = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {
  }

  login(mail: string, password: string) {
    this.loginValidation(mail, password).subscribe(res => {
      if (res) {
          // @ts-ignore
        localStorage.setItem('token', res['accessToken']);
        // @ts-ignore
        localStorage.setItem('userId', res['userId']);
        //redirect to route home
        this.router.navigate(['/home']);
        this.userService.initUser();
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }

  loginValidation(mail: string, password: string) {
    let body = {
      mail: mail,
      password: password
    };
    return this.http.post('https://reddot-back.onrender.com/login/', body);
  }

}
