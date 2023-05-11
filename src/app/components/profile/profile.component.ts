import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/models/user.model';
import { AuthServiceService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userId = "";
  loggedUser: User = {id: '', mail: '', pseudo: '', password: '', userPosts: [], userSubscribes: []};
  editMode = false;

  constructor(
    //private authService: AuthServiceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.userId = localStorage.getItem('userId');

    this.getUser(this.userId).subscribe(res => {
      this.loggedUser = res as User;
    });

  }

  getUser(id: string) {
    return this.http.get(`http://localhost:3000/users/${id}`);
  }
}
