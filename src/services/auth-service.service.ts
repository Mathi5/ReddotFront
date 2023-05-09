import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn = false;
  token = '';

  constructor(
    private http: HttpClient,
  ) {
  }

  login(email: string, password: string) {
    this.loginValidation(email, password).subscribe(res => {
      console.log(res);
      // this.token = res;
    });
    // if (this.token) {
    //   this.isLoggedIn = true;
    //   console.log('User is logged in');
    // } else {
    //   console.log('Invalid credentials');
    // }
  }

  logout() {
    this.isLoggedIn = false;
    console.log('User is logged out');
  }

  loginValidation(email: string, password: string) {
    let body = {
      email: email,
      password: password
    }
    return this.http.put('http://localhost:3000/login/', body);
  }
}
